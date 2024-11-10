const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes.js");
const furnitureRoutes =require('./routes/furnitureRoutes.js')
const purchaseRoutes = require('./routes/purchaseRoutes.js')
const verifyToken = require('./middlewares/verifyToken.js')

dotenv.config();

const app = express();
dotenv.config();

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

//routes
app.use("/user", userRoutes);
app.use("/furniture", furnitureRoutes)
app.use("/purchase", purchaseRoutes)
//app.use('/purchase', verifyToken, purchaseRoutes)

app.listen(process.env.PORT, () => {
  console.log(`now backend is hosted in port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("DID NOT connect to MongoDB");
  });
