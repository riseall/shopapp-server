const db = require("../models");
const Product = db.products;

exports.findAll = (req, res) => {
  Product.find()
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

exports.findOne = (req, res) => {
  Product.findOne({
    code: req.params.id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while retrieving products.",
      });
    });
};
