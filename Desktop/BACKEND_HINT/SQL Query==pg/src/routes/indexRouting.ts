import express, { Router } from "express";
import productRouter from "../routes/productPath";
const mainRouter = Router();

mainRouter.use("/product", productRouter);
export default mainRouter;