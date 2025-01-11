module.exports = (app) => {
  const order = require("../controllers/order.controller");
  const router = require("express").Router();

  router.get("/user/:id", order.findOrder);
  router.post("/user/:id/add", order.addToCart);

  app.use("/api/orders", router);
};
