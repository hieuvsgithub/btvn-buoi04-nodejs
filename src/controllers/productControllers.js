import mongoose, { Error } from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({ isHidden: false }).populate(
      "categoryId",
      "title"
    );
    if (!products.length) {
      return res.status(404).send({ message: "ko tim thay san pham nao" });
    }
    return res
      .status(200)
      .send({ message: "Lay thanh cong danh sach san pham", products });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const getByIdProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("categoryId", "title");
    if (!product) {
      return res.status(404).send({ message: "Lay san pham that bai" });
    }
    return res
      .status(200)
      .send({ message: "Lay san pham thanh cong", product });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    let { title, price, description, categoryId } = req.body;
    if (!categoryId) {
      categoryId = "6783838c6975badc60e3ae0f";
    } else if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      return next(new Error("danh muc ko ton tai, them san pham moi that bai"));
    }

    const newProduct = await Product.create({
      title,
      price,
      description,
      categoryId,
    });
    return res
      .status(200)
      .send({ message: "them san pham moi thanh cong ", newProduct });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const updateByIdProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, price, description, categoryId } = req.body;
    if (!categoryId) {
      categoryId = "6783838c6975badc60e3ae0f";
    } else if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      return next(new Error("danh muc ko ton tai, them san pham moi that bai"));
    }

    const newProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        description,
        categoryId,
      },
      { new: true, timestamps: true }
    );

    if (newProduct.categoryId.toString() !== categoryId) {
      await Category.updateOne(
        { _id: newProduct.categoryId },
        { $pull: { products: id } }
      );
      await Category.updateOne(
        { _id: categoryId },
        { $push: { products: id } }
      );
    }
    return res
      .status(200)
      .send({ message: "cap nhat san pham thanh cong", newProduct });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const removeByIdProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).send({ message: "ko tim thay san pham" });
  }
  await Category.updateOne(
    { _id: product.categoryId },
    { $pull: { products: id } }
  );
  return res.status(200).send({ message: "xoa thanh cong", product });
};

const deleteSoftProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        deleteAt: new Date(),
        isHidden: true,
      },
      { new: true }
    );
    if (product) {
      return res.status(404).send({ message: "ko tim thay san pham muon xoa" });
    }
    return res.status(200).send(product);
  } catch (error) {
    errorReportServer(res, error);
  }
};

const restoreProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        deleteAt: null,
        isHidden: false,
      },
      { new: true }
    );
    if (product) {
      return res
        .status(404)
        .send({ message: "ko tim thay san pham muon khoi phuc" });
    }
    return res.status(200).send(product);
  } catch (error) {
    errorReportServer(res, error);
  }
};
export {
  getAllProduct,
  getByIdProduct,
  createProduct,
  updateByIdProduct,
  removeByIdProduct,
  deleteSoftProduct,
  restoreProduct,
};
