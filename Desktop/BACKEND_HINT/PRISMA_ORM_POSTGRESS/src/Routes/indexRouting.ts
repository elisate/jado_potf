import { Router } from "express";
import productRoutes from "./productRoutes";

const mainRouter = Router();

mainRouter.use("/products", productRoutes);

export default mainRouter;
