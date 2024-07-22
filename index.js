const express = require("express");
const PORT = 8000;

const requestLogger = require("./middlewares/requestLogger");
const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/products", (req, res) => {
  // GET PRODUCT FROM DB
  res.status(200).send({
    product_count: 1,
    size: "L",
  });
});

app.post("products/:id"),
  (req, res) => {
    // console.log("jhjh");
    const { id } = req.params;
    const { image } = req.body;

    if (!image) {
      res.status(418).send({ message: `No Image Sent` });
    }
    res.send({
      product: `Product with ${id} created`,
    });
  };

app.listen(PORT, () => console.log("Server is running!"));
