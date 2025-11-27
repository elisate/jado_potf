import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,

} from "../controller/productController";
const productRouter = express();

// Define routes
productRouter.post("/createproducts", createProductController);  

productRouter.get("/getAllProducts", getAllProductsController);

productRouter.get("/products/:id", getProductByIdController);  

export default productRouter;