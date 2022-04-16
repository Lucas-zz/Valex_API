import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});
