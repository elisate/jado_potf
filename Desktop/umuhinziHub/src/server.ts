import dbConnection from "./config/dbConfiguration"

import express from "express";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT;
const HOST=process.env.PG_HOST ;
const app = express();
dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
});

app.use(express.json());

