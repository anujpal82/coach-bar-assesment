const express = require("express");
const {
  authenticateToken,
  isAdmin,
} = require("../middlewares/auth.middleware");
const { createProduct, deleteProduct, EditProduct, getAllProducts } = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.post("/create-product", authenticateToken, createProduct);
productRouter.delete("/:id", authenticateToken,isAdmin, deleteProduct);
productRouter.put('/:id',authenticateToken,isAdmin,EditProduct)
productRouter.get('/get-all-products',authenticateToken,getAllProducts)

module.exports = productRouter;
