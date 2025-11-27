
import { pool } from "../config/dbCofiguration";

export interface Product {
  id?: number;        // optional because PostgreSQL will auto-generate
  name: string;
  description: string;
  price: number;
  stock: number;
}

// Create the products table (run once)
export const createProductTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      stock INT DEFAULT 0
    );
  `);
  console.log("✅ Products table ensured in database");
};

// Create a new product
export const createProduct = async (product: Product) => {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, stock) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [product.name, product.description, product.price, product.stock]
  );
  return result.rows[0];
};

// Get all products
export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return result.rows;
};

// Get a single product by ID
export const getProductById = async (id: number) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

// Update a product by ID
export const updateProduct = async (id: number, product: Product) => {
  const result = await pool.query(
    `UPDATE products 
     SET name = $1, description = $2, price = $3, stock = $4 
     WHERE id = $5 RETURNING *`,
    [product.name, product.description, product.price, product.stock, id]
  );
  return result.rows[0];
};

// Delete a product by ID
export const deleteProduct = async (id: number) => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
  return { message: "Product deleted successfully" };
};
