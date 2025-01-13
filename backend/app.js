const express = require("express");
const corsMiddleware = require("./middleware/corsMiddleware");
const protectedRoute = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const businessCardRoutes = require("./routes/businessCardRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/businesscards", protectedRoute, businessCardRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
