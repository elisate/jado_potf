import { DataSource } from "typeorm";

import User from "../entity/userEntity.js";
import Token from "../entity/Token.js";
import Agent from "../entity/Agent.js";
import Employee from "../entity/Employee.js";
import Organization from "../entity/Organization.js";
//start line of mireille
// import  User from "../entity/userEntity.js";
// import  Token  from "../entity/Token.js";
// import  Agent  from "../entity/Agent.js";
// import  Employee  from "../entity/Employee.js";
// import  Organization  from "../entity/Organization.js";



//endline of mireille

//start line of deborah
import Loan from "../entity/Loan.js";
import Payment from "../entity/Payment.js";
import RNRSAccount from "../entity/RNRSAccount.js";
import * as dotenv from "dotenv";
dotenv.config();

// Configure SSL based on environment
const sslConfig = process.env.NODE_ENV === 'production' 
  ? { ssl: { rejectUnauthorized: false } }
  : { ssl: false };

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_URL,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["error"],

  entities: [User, Token, Agent, Employee, Organization, Loan, Payment, RNRSAccount],
  migrations: [],
  subscribers: [],
  ...sslConfig

});

export const InitializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
    throw error;
  }
};
