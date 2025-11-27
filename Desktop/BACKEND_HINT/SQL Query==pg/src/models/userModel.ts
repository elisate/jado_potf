import dbConnection from "../config/dbCofiguration";
import { pool } from "../config/dbCofiguration";
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

// Create table (run once)
export const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `);
};

// Create new user
export const createUser = async (user: User) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [user.name, user.email, user.password]
  );
  return result.rows[0];
};

// Get all users
export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// Get one user by ID
export const getUserById = async (id: number) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

// Update user
export const updateUser = async (id: number, user: User) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 RETURNING *",
    [user.name, user.email, user.password, id]
  );
  return result.rows[0];
};

// Delete user
export const deleteUser = async (id: number) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
  return { message: "User deleted successfully" };
};
