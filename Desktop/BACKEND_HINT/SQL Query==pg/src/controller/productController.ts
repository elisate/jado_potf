import { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  Product,
} from "../models/productModel";

// Create a new product
export const createProductController = async (req: Request, res: Response) => {
  try {
    const productData: Product = req.body;
    const newProduct = await createProduct(productData);
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products
export const getAllProductsController = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product by ID
export const updateProductController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const productData: Product = req.body;
    const updatedProduct = await updateProduct(id, productData);
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a product by ID
export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteProduct(id);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
