import { response, Router } from "express";
import { usersCollection } from "../models/index.js";
import { ordersCollection } from "../models/index.js";

export default ({ config, db }) => {
  let router = Router();

  // creating a new user
  router.post("/", async (req, res) => {
    try {
      const newUser = req.body;
      await usersCollection.create(newUser).then((response) => {
        res.send({ payload: response });
      });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: error.errorResponse.errmsg });
    }
  });

  // hw : get all users that have 2 orders and more AND at least one of the orders has a product with qty >= 2

  router.get("/twoOrMore", async (req, res) => {
    try {
      const users = await usersCollection.find({
        $expr: {
          $gte: [{ $size: "$orders" }, 2],
        },
      });
      const filteredUsers = [];

      for (let user of users) {
        const orders = await ordersCollection.find({
          user: user._id,
          "products.quantity": { $gte: 2 },
        });

        if (orders.length > 0) {
          filteredUsers.push(user);
        }
      }
      res.send({ payload: filteredUsers });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });

  return router;
};
