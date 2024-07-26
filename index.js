import express from "express";
import api from "./api/index.js";
import dotenv from "dotenv";
import CONFIG from "./config.json" assert { type: "json" };
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT || 7000;
const app = express();

mongoose
  .connect(CONFIG.mongo_url)
  .then((db) => {
    app.use(express.json());
    app.use("/api", api({ config: CONFIG, db }));

    app.listen(PORT, () => console.log(`SERVER IS RUNNING IN ${PORT}`));
  })

  .catch((err) => {
    console.log(err, "Recieved an error");
  });
