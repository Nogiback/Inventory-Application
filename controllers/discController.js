const Disc = require("../models/disc");
const DiscType = require("../models/discType");
const Manufacturer = require("../models/manufacturer");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.disc_list = asyncHandler(async (req, res, next) => {
  const allDiscs = await Disc.find({}, "name manufacturer plastic price stock")
    .sort({ name: 1 })
    .populate("manufacturer")
    .exec();

  res.render("disc_list", { title: "Disc List", discList: allDiscs });
});

exports.disc_details = asyncHandler(async (req, res, next) => {
  const disc = await Disc.findById(req.params.id)
    .populate("manufacturer")
    .populate("discType")
    .exec();

  if (disc === null) {
    const err = new Error("Disc not found");
    err.status = 404;
    return next(err);
  }

  res.render("disc_details", {
    title: "Disc Details",
    disc: disc,
  });
});

exports.disc_create_get = asyncHandler(async (req, res, next) => {
  const [allManufacturers, allDiscTypes] = await Promise.all([
    Manufacturer.find().sort({ name: 1 }).exec(),
    DiscType.find().sort({ type: 1 }).exec(),
  ]);

  res.render("disc_form", {
    title: "Add Disc",
    manufacturers: allManufacturers,
    discTypes: allDiscTypes,
  });
});

exports.disc_create_post = [
  body("name", "Disc name is required.").trim().isLength({ min: 1 }).escape(),
  body("manufacturer", "Manufacturer is required.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("plastic", "Plastic type is required.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("speed", "Speed rating required.").isFloat({ min: 1, max: 15 }),
  body("glide", "Glide rating required.").isFloat({ min: 0, max: 7 }),
  body("turn", "Turn rating required.").isFloat({ min: -5, max: 2 }),
  body("fade", "Fade rating required.").isFloat({ min: 0, max: 6 }),
  body("discType", "Disc type is required.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price required.").isFloat(),
  body("stock", "Stock amount required.").isFloat(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const disc = new Disc({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      plastic: req.body.plastic,
      flightNumbers: {
        speed: req.body.speed,
        glide: req.body.glide,
        turn: req.body.turn,
        fade: req.body.fade,
      },
      discType: req.body.discType,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const [allManufacturers, allDiscTypes] = await Promise.all([
        Manufacturer.find().sort({ name: 1 }).exec(),
        DiscType.find().sort({ type: 1 }).exec(),
      ]);

      res.render("disc_form", {
        title: "Add Disc",
        manufacturers: allManufacturers,
        discTypes: allDiscTypes,
        disc: disc,
        errors: errors.array(),
      });
      return;
    } else {
      await disc.save();
      res.redirect(disc.url);
    }
  }),
];

exports.disc_delete_get = asyncHandler(async (req, res, next) => {
  const disc = await Disc.findById(req.params.id)
    .populate("manufacturer")
    .populate("discType")
    .exec();

  if (disc === null) {
    res.redirect("/store/discs");
  }

  res.render("disc_delete", {
    title: "Delete Disc",
    disc: disc,
  });
});

exports.disc_delete_post = asyncHandler(async (req, res, next) => {
  await Disc.findByIdAndDelete(req.body.discId);
  res.redirect("/store/discs");
});

exports.disc_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Disc Update GET");
});

exports.disc_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Disc Update POST");
});
