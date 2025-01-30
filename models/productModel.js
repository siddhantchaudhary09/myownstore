const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [String],
  sizeOptions: [String], // E.g., S, M, L, etc.
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
