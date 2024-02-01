const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscSchema = new Schema({
  name: { type: String, required: true },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  plastic: { type: String, required: true },
  flightNumbers: {
    speed: { type: Number, required: true },
    glide: { type: Number, required: true },
    turn: { type: Number, required: true },
    fade: { type: Number, required: true },
  },
  discType: { type: Schema.Types.ObjectId, ref: "DiscType", required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

DiscSchema.virtual("url").get(function () {
  return `/store/discs/${this._id}`;
});

module.exports = mongoose.model("Disc", DiscSchema);
