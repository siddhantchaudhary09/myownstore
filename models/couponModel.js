const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  expiryDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Coupon", couponSchema);
