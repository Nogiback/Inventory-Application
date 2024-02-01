const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscTypeSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
});

DiscTypeSchema.virtual("url").get(function () {
  return `/store/discType/${this._id}`;
});

module.exports = mongoose.model("DiscType", DiscTypeSchema);
