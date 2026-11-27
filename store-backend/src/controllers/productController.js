const Product = require("../models/product");
const mongoose = require("mongoose");

//Create a new Product
const createProduct = async (req, res) => {
    try {


if (!req.body.name || !req.body.price || !req.body.category) {
    return res.status(400).json({
        message: "Name, price, and category are required"
    });
}

if (typeof req.body.price !== "number" || req.body.price <= 0) {
    return res.status(400).json({
        message: "Price must be a positive number"
    });
}

if (req.body.stock !== undefined &&
    (!Number.isInteger(req.body.stock) || req.body.stock < 0)) {
    return res.status(400).json({
        message: "Stock must be a non-negative integer"
    });
}

        const savedProduct = await Product.create(req.body);

        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//GET All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//GET Product by ID

const getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
        message: "Invalid product ID"
    });
}
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Update Product
const updateProduct = async (req, res) =>{
  try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(updatedProduct);
    }catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//Delete Product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };