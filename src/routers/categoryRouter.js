import { Router } from "express";
import {
  createCategory,
  deleteSoftCategory,
  getAllCategory,
  getByIdCategory,
  removeCategory,
  restoreCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategory);
categoryRoutes.get("/:id", getByIdCategory);
categoryRoutes.post("/", createCategory);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", removeCategory);
categoryRoutes.patch("/soft-delete/:id", deleteSoftCategory);
categoryRoutes.patch("/restore/:id", restoreCategory);

export default categoryRoutes;
