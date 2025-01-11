const db = require("../models");
const Order = db.order;

exports.findOrder = (req, res) => {
  const id = Number(req.params.id); //

  Order.aggregate([
    {
      $match: { user_id: id },
    },
    {
      $lookup: {
        from: "products",
        localField: "cart_items",
        foreignField: "code",
        as: "products",
      },
    },
  ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(409).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.addToCart = (req, res) => {
  const id = Number(req.params.id);
  const productCode = String(req.body.product);

  Order.updateOne(
    {
      user_id: id,
    },
    {
      $addToSet: {
        cart_items: productCode,
      },
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};
