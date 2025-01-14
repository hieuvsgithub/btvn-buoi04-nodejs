import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
