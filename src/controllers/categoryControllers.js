import Product from "../models/Product.js";
import Category from "../models/Category.js";

const errorReportServer = (res, error) => {
  return res
    .status(500)
    .send({ message: "Error!", error: error.message || "Error!" });
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res
        .status(404)
        .send({ message: "ko tim thay danh sach danh muc " });
    }
    return res
      .status(200)
      .send({ message: "Ly thanh cong danh sach danh muc", categories });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const getByIdCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("products");
    if (!category) {
      return res.status(404).send({ message: "lay danh muc that bai" });
    }
    return res
      .status(200)
      .send({ message: "lay danh muc thanh cong ", category });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const newCategory = await Category.create(category);
    return res
      .status(200)
      .send({ message: "them moi danh muc thanh cong", newCategory });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const newCategory = await Category.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!newCategory) {
      return res.status(404).send({ message: "cap nhan san pham that bai" });
    }
    return res
      .status(200)
      .send({ message: "cap nhan san pham thanh cong", newCategory });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const removeCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.toString() === "6783838c6975badc60e3ae0f") {
      return next(new Error("khong the xoa danh muc mac dinh"));
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({ message: "ko tim thay danh muc muon xoa" });
    }

    await Product.updateMany(
      { categoryId: id },
      { categoryId: "6783838c6975badc60e3ae0f" }
    );

    await Category.updateOne(
      { _id: "6783838c6975badc60e3ae0f" },
      { $push: { products: { $each: category.products } } }
    );

    return res.status(200).send({ message: "xoa danh muc thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const deleteSoftCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        isHidden: true,
        deleteAt: new Date(),
      },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .send({ message: "ko tim thay danh muc ban muon xoa mem" });
    }
    return res.status(200).send({ message: "xoa danh muc thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

const restoreCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        isHidden: false,
        deleteAt: null,
      },
      { new: true }
    );
    if (!category) {
      return res
        .status(404)
        .send({ message: "ko tim thay danh muc ban muon khoi phuc" });
    }
    return res.status(200).send({ message: "khoi phuc danh muc thanh cong" });
  } catch (error) {
    errorReportServer(res, error);
  }
};

export {
  getAllCategory,
  getByIdCategory,
  createCategory,
  updateCategory,
  removeCategory,
  deleteSoftCategory,
  restoreCategory,
};
