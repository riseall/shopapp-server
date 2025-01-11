const express = require("express");
const cors = require("cors");
const path = require("path");
// create instance node
const app = express();

let corsOptions = {
  origin: "http://localhost:8080",
};
// enable cors
app.use(cors(corsOptions));
// parse request of content-type - application/json
app.use(express.json());
// parse content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
//path for image
app.use("/img", express.static(path.join(__dirname, "./public/img")));
//Connect to database
const db = require("./app/models");
db.mongoose
  .connect(db.url, {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ShopApp Server",
  });
});

require("./app/routes/product.route")(app);
require("./app/routes/order.route")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
