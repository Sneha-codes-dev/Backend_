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
        const {
            search,
            category,
            minPrice,
            maxPrice,
            page = "1",
            limit = "10",
            sort
        } = req.query;

        const filter = {};

        // Product search by name
        if (typeof search === "string" && search.trim()) {
            const escapedSearch = search.trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            filter.name = {
                $regex: escapedSearch,
                $options: "i"
            };
        }

        // Filter products by category
        if (typeof category === "string" && category.trim()) {
            const escapedCategory = category.trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            filter.category = {
                $regex: `^${escapedCategory}$`,
                $options: "i"
            };
        }

        // Validate price range
        for (const price of [minPrice, maxPrice]) {
            if (price !== undefined &&
                (typeof price !== "string" ||
                 !price.trim() ||
                 !Number.isFinite(Number(price)) ||
                 Number(price) < 0)) {
                return res.status(400).json({
                    message: "Price filters must be non-negative numbers"
                });
            }
        }

        if (minPrice !== undefined &&
            maxPrice !== undefined &&
            Number(minPrice) > Number(maxPrice)) {
            return res.status(400).json({
                message: "Minimum price cannot exceed maximum price"
            });
        }

        // Filter products by price range
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Validate pagination parameters
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (typeof page !== "string" ||
            typeof limit !== "string" ||
            !Number.isSafeInteger(pageNumber) ||
            !Number.isSafeInteger(limitNumber) ||
            pageNumber < 1 ||
            limitNumber < 1 ||
            limitNumber > 100) {
            return res.status(400).json({
                message: "Page must be a positive integer and limit must be between 1 and 100"
            });
        }

        // Pagination
        const skip = (pageNumber - 1) * limitNumber;

        if (!Number.isSafeInteger(skip)) {
            return res.status(400).json({
                message: "Page number is too large"
            });
        }

        // Sorting by price
        let sortOption = { _id: 1 };

        if (sort === "price_asc") {
            sortOption = { price: 1, _id: 1 };
        } else if (sort === "price_desc") {
            sortOption = { price: -1, _id: 1 };
        } else if (sort !== undefined) {
            return res.status(400).json({
                message: "Invalid sort option. Use price_asc or price_desc"
            });
        }

        // Count matching products
        const totalProducts = await Product.countDocuments(filter);

        // Fetch products
        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json({
            totalProducts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProducts / limitNumber),
            products
        });

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