import { response, Router } from "express";
import { usersCollection } from "../models/index.js";
import { ordersCollection } from "../models/index.js";

export default ({ config, db }) => {
  let router = Router();

  // creating a new user
  router.post("/", async (req, res) => {
    let ErrorException = { message: "Please fill all the info required" };

    try {
      const newUser = req.body;
      if (newUser._id && newUser.username && newUser.email && newUser.age) {
        await usersCollection.create(newUser).then((response) => {
          res.send({ payload: response });
        });
      } else {
        throw ErrorException;
      }
    } catch (error) {
      if (error === ErrorException) {
        res.send({ error });
      } else {
        res
          .status(500)
          .send({ success: false, message: error.errorResponse.errmsg });
      }
    }
  });

  // hw : get all users that have 2 orders and more AND at least one of the orders has a product with qty >= 2

  router.get("/twoOrMore", async (req, res) => {
    try {
      const users = await usersCollection.find({
        $expr: {
          $gte: [{ $size: "$orders" }, 2], // first condition : checked if there are users who have two orders or more
        },
      });
      const filteredUsers = []; // then i created an empty array where im gonna stock the users who verify both conditions

      for (let user of users) {
        const orders = await ordersCollection.find({
          user: user._id,
          "products.quantity": { $gte: 2 }, // second condition : for each user who verified the first condition we filter them according to the qty of the products in their orders (should be >=2)
        });

        if (orders.length > 0) {
          filteredUsers.push(user); // if at least one of the users in the database verifies both conditions we stck his infos in the empty array we created and we return it
        }
      }
      if (filteredUsers.length === 0) {
        res.status(404).send({ success: false, message: "No users found" });
      } else {
        res.send({ payload: filteredUsers });
      }
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });

  return router;
};
