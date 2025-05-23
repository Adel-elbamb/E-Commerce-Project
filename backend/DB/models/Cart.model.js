import mongoose, { Schema, Types } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
}, {
  timestamps: true,
});

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default cartModel;
