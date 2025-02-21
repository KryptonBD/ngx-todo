import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Todo } from "../entities/Todo";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  synchronize: true,
  entities: [Todo],
});
