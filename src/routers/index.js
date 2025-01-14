import { Router } from "express";
import productRoutes from "./productRouter.js";
import categoryRoutes from "./categoryRouter.js";
import authRoutes from "./authRouter.js";

const routes = Router();
routes.use("/products", productRoutes);
routes.use("/category", categoryRoutes);
routes.use("/auth", authRoutes);

export default routes;
