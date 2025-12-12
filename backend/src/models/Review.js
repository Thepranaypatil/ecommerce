import mongoose, { Schema } from "mongoose";
const ProductReviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    username: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  { timestamps: true }
);

const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);
export default ProductReview;
