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
  res.send("NOT YET IMPLEMENTED: Disc Create GET");
});

exports.disc_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Disc Create POST");
});

exports.disc_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Disc Delete GET");
});

exports.disc_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Disc Delete POST");
});

exports.disc_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Disc Update GET");
});

exports.disc_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Disc Update POST");
});
