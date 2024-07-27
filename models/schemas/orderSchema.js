import mongoose from "mongoose";

let Schema = mongoose.Schema;

const orderSchema = new Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  status: { type: String, required: true }, //shipped, processing, delivered
});

export default orderSchema;
