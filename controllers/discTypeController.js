const DiscType = require("../models/discType");
const asyncHandler = require("express-async-handler");

exports.discType_list = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: DiscType List");
});

exports.discType_details = asyncHandler(async (req, res, next) => {
  res.send(`NOT YET IMPLEMENTED: DiscType Details ${req.params.id}`);
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
