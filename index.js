import express from "express";
import routes from "./src/routers/index.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.json());

connectDB();

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/api`);
});
