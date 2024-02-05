const Manufacturer = require("../models/manufacturer");
const Disc = require("../models/disc");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.manufacturer_list = asyncHandler(async (req, res, next) => {
  const manufacturers = await Manufacturer.find().sort({ name: 1 }).exec();

  res.render("manufacturer_list", {
    title: "Manufacturers",
    manufacturers: manufacturers,
  });
});

exports.manufacturer_details = asyncHandler(async (req, res, next) => {
  const [manufacturer, allDiscsByManufacturer] = await Promise.all([
    Manufacturer.findById(req.params.id).exec(),
    Disc.find({ manufacturer: req.params.id }, "name plastic").exec(),
  ]);

  if (manufacturer === null) {
    const err = new Error("Manufacturer not found");
    err.status = 404;
    return next(err);
  }

  res.render("manufacturer_details", {
    title: "Manufacturer Details",
    manufacturer: manufacturer,
    allDiscsByManufacturer: allDiscsByManufacturer,
  });
});

exports.manufacturer_create_get = (req, res, next) => {
  res.render("manufacturer_form", { title: "Add Manufacturer" });
};

exports.manufacturer_create_post = [
  body("name", "Manufacturer name must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const manufacturer = new Manufacturer({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("manufacturer_form", {
        title: "Add Manufacturer",
        manufacturer: manufacturer,
        errors: errors.array(),
      });
      return;
    } else {
      const manufacturerExists = await Manufacturer.findOne({
        name: req.body.name,
      }).exec();
      if (manufacturerExists) {
        res.redirect(manufacturerExists.url);
      } else {
        await manufacturer.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect(manufacturer.url);
      }
    }
  }),
];

exports.manufacturer_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Manufacturer Delete GET");
});

exports.manufacturer_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Manufacturer Delete POST");
});

exports.manufacturer_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Manufacturer Update GET");
});

exports.manufacturer_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Manufacturer Update POST");
});
