import { AppDataSource } from "../config/db.js";
import User, { UserRole } from "../entity/userEntity.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });


console.log("DB_PASSWORD =", process.env.DB_PASSWORD);

async function seedAdmin() {
  try {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error("Missing ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD in environment variables.");
    }

    // Check if an admin already exists
    const existingAdmin = await userRepository.findOneBy({ role: UserRole.ADMIN });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    await userRepository.save(adminUser);
    console.log(` Admin created: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error(" Error during seeding:", error);
    process.exit(1);
  }
}

seedAdmin().catch((err) => {
  console.error(" Error seeding admin:", err);
  process.exit(1);
});
