import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME || "",
  api_key: process.env.CLOUD_KEY || "",
  api_secret: process.env.CLOUD_SECRET || "",
  timeout: 60000,
};

if (
  !cloudinaryConfig.cloud_name ||
  !cloudinaryConfig.api_key ||
  !cloudinaryConfig.api_secret
) {
  throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config(cloudinaryConfig);

export default cloudinary;
