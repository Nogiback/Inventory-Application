const Disc = require("../models/disc");
const DiscType = require("../models/discType");
const Manufacturer = require("../models/manufacturer");
const asyncHandler = require("express-async-handler");

exports.store = asyncHandler(async (req, res, next) => {
  // Get counts
  const [numDiscs, numDiscTypes, numManufacturers, allDiscs] =
    await Promise.all([
      Disc.countDocuments({}).exec(),
      DiscType.countDocuments({}).exec(),
      Manufacturer.countDocuments({}).exec(),
      Disc.find({}, { stock: 1 }).exec(),
    ]);

  const inventory = allDiscs.reduce((accumulator, disc) => {
    return (accumulator += disc.stock);
  }, 0);

  res.render("store", {
    title: "Nogi's Disc Golf Inventory",
    numDiscs: numDiscs,
    numDiscTypes: numDiscTypes,
    numManufacturers: numManufacturers,
    inventory: inventory,
  });
});

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "Nogi's Disc Golf Inventory",
  });
});
