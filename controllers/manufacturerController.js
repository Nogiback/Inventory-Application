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
        res.redirect(manufacturer.url);
      }
    }
  }),
];

exports.manufacturer_delete_get = asyncHandler(async (req, res, next) => {
  const [manufacturer, allDiscsByManufacturer] = await Promise.all([
    Manufacturer.findById(req.params.id).exec(),
    Disc.find({ manufacturer: req.params.id }, "name plastic").exec(),
  ]);

  if (manufacturer === null) {
    res.redirect("/store/manufacturers");
  }

  res.render("manufacturer_delete", {
    title: "Delete Manufacturer",
    manufacturer: manufacturer,
    allDiscsByManufacturer: allDiscsByManufacturer,
  });
});

exports.manufacturer_delete_post = asyncHandler(async (req, res, next) => {
  const [manufacturer, allDiscsByManufacturer] = await Promise.all([
    Manufacturer.findById(req.params.id).exec(),
    Disc.find({ manufacturer: req.params.id }, "name plastic").exec(),
  ]);

  if (allDiscsByManufacturer.length > 0) {
    allDiscsByManufacturer.forEach(async (disc) => {
      await Disc.findByIdAndDelete(disc._id);
    });
  }

  await Manufacturer.findByIdAndDelete(req.body.manufacturerId);
  res.redirect("/store/manufacturers");
});

exports.manufacturer_update_get = asyncHandler(async (req, res, next) => {
  const manufacturer = await Manufacturer.findById(req.params.id).exec();

  if (manufacturer === null) {
    const err = new Error("Manufacturer not found");
    err.status = 404;
    return next(err);
  }

  res.render("manufacturer_form", {
    title: "Update Manufacturer",
    manufacturer: manufacturer,
  });
});

exports.manufacturer_update_post = [
  body("name", "Manufacturer name must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const manufacturer = new Manufacturer({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("manufacturer_form", {
        title: "Update Manufacturer",
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
        const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
          req.params.id,
          manufacturer,
          {}
        );
        res.redirect(updatedManufacturer.url);
      }
    }
  }),
];
