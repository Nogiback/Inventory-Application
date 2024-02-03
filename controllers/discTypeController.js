const DiscType = require("../models/discType");
const Disc = require("../models/disc");
const asyncHandler = require("express-async-handler");

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

exports.discType_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: DiscType Create GET");
});

exports.discType_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: DiscType Create POST");
});

exports.discType_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: DiscType Delete GET");
});

exports.discType_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: DiscType Delete POST");
});

exports.discType_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: DiscType Update GET");
});

exports.discType_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: DiscType Update POST");
});
