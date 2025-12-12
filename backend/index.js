import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth/auth-routes.js";
import adminProductsRouter from "./src/routes/admin/products-routes.js";
import adminOrderRouter from "./src/routes/admin/order-routes.js";

import shopProductsRouter from "./src/routes/shop/products-routes.js";
import shopCartRouter from "./src/routes/shop/cart-routes.js";
import shopAddressRouter from "./src/routes/shop/address-routes.js";
import shopOrderRouter from "./src/routes/shop/order-routes.js";
import shopSearchRouter from "./src/routes/shop/search-routes.js";
import shopReviewRouter from "./src/routes/shop/review-routes.js";

import commonFeatureRouter from "./src/routes/common/feature-routes.js";
dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expries",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
