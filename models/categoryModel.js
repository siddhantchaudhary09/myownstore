const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Category", categorySchema);
