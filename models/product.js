const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    comment: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    discription: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    reviews: [reviewSchema],
    userid: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
