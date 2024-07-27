import mongoose from "mongoose";

let Schema = mongoose.Schema;

const productSchema = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [String],
  stock: { type: Number, required: true },
});

export default productSchema;
