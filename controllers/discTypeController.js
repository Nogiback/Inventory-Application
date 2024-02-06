const DiscType = require("../models/discType");
const Disc = require("../models/disc");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.discType_list = asyncHandler(async (req, res, next) => {
  const discTypes = await DiscType.find().sort({ type: 1 }).exec();

  res.render("discType_list", { title: "Disc Types", discTypes: discTypes });
});

exports.discType_details = asyncHandler(async (req, res, next) => {
  const [discType, discsOfDiscType] = await Promise.all([
    DiscType.findById(req.params.id).exec(),
    Disc.find({ discType: req.params.id }, "name manufacturer plastic")
      .populate("manufacturer")
      .exec(),
  ]);

  if (discType === null) {
    const err = new Error("Disc Type not found");
    err.status = 404;
    return next(err);
  }

  res.render("discType_details", {
    title: "Disc Type Details",
    discType: discType,
    discsOfDiscType: discsOfDiscType,
  });
});

exports.discType_create_get = (req, res, next) => {
  res.render("discType_form", { title: "Add Disc Type" });
};

exports.discType_create_post = [
  body("type")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Disc type required."),
  body("description")
    .trim()
    .isLength({ max: 500 })
    .escape()
    .withMessage("Max 500 characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const discType = new DiscType({
      type: req.body.type,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("discType_form", {
        title: "Add Disc Type",
        discType: discType,
        errors: errors.array(),
      });
      return;
    } else {
      await discType.save();
      res.redirect(discType.url);
    }
  }),
];

exports.discType_delete_get = asyncHandler(async (req, res, next) => {
  const [discType, allDiscsByType] = await Promise.all([
    DiscType.findById(req.params.id).exec(),
    Disc.find({ discType: req.params.id }, "name plastic").exec(),
  ]);

  if (discType === null) {
    res.redirect("/store/discTypes");
  }

  res.render("discType_delete", {
    title: "Delete Disc Type",
    discType: discType,
    allDiscsByType: allDiscsByType,
  });
});

exports.discType_delete_post = asyncHandler(async (req, res, next) => {
  const [discType, allDiscsByType] = await Promise.all([
    DiscType.findById(req.params.id).exec(),
    Disc.find({ discType: req.params.id }, "name plastic").exec(),
  ]);

  if (allDiscsByType.length > 0) {
    res.render("discType_delete", {
      title: "Delete Disc Type",
      discType: discType,
      allDiscsByType: allDiscsByType,
    });
    return;
  } else {
    await DiscType.findByIdAndDelete(req.body.discTypeId);
    res.redirect("/store/discTypes");
  }
});

exports.discType_update_get = asyncHandler(async (req, res, next) => {
  const discType = await DiscType.findById(req.params.id).exec();

  if (discType === null) {
    const err = new Error("Disc type not found");
    err.status = 404;
    return next(err);
  }

  res.render("discType_form", {
    title: "Update Disc Type",
    discType: discType,
  });
});

exports.discType_update_post = [
  body("type")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Disc type required."),
  body("description")
    .trim()
    .isLength({ max: 500 })
    .escape()
    .withMessage("Max 500 characters."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const discType = new DiscType({
      type: req.body.type,
      description: req.body.description,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("discType_form", {
        title: "Update Disc Type",
        discType: discType,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedDiscType = await DiscType.findByIdAndUpdate(
        req.params.id,
        discType,
        {}
      );
      res.redirect(updatedDiscType.url);
    }
  }),
];
