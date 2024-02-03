const Manufacturer = require("../models/manufacturer");
const asyncHandler = require("express-async-handler");

exports.manufacturer_list = asyncHandler(async (req, res, next) => {
  const manufacturers = await Manufacturer.find().sort({ name: 1 }).exec();

  res.render("manufacturer_list", {
    title: "Manufacturers",
    manufacturers: manufacturers,
  });
});

exports.manufacturer_details = asyncHandler(async (req, res, next) => {
  res.send(`NOT YET IMPLEMENTED: Manufacturer Details: ${req.params.id}`);
});

exports.manufacturer_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Manufacturer Create GET");
});

exports.manufacturer_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Manufacturer Create POST");
});

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
