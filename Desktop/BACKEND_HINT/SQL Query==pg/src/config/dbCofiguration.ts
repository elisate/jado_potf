import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL, // use full connection string
  ssl: {
    rejectUnauthorized: false, // important for Render-hosted DB
  },
});

const dbConnection = async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL database");
  } catch (err) {
    if (err instanceof Error) {
      console.error(" Database connection error:", err.message);
    } else {
      console.error(" Database connection error:", err);
    }
  }
};

export default dbConnection;
export { pool };
