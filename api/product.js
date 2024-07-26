import { Router } from "express";
import { productsCollection } from "../models/index.js";

export default ({ config, db }) => {
  let router = Router();

  // TO retrieve all products
  // POST /products
  router.post("/", async (req, res) => {
    let ErrorException = { message: "Please fill all the info required" };
    try {
      const newProduct = req.body;
      if (
        newProduct.name &&
        newProduct.price &&
        newProduct.category &&
        newProduct.stock
      ) {
        await productsCollection.create(newProduct).then((response) => {
          res.send({ success: true, payload: response });
        });
      } else {
        throw ErrorException;
      }
    } catch (error) {
      if (error === ErrorException) {
        res.send({ error });
      } else if (error.code === 11000) {
        res.send({ message: "A product with this name already exists" });
      } else {
        res.status(500).send({
          success: false,
          message:
            error && ErrorEvent.errorResponse
              ? error.errorResponse.errmsg
              : "error",
        });
      }
    }
  });

  return router;
};
