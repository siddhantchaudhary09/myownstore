import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      size: { type: String },
    },
  ],
  appliedCoupons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
