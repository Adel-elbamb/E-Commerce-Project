import Product from "../../../../DB/models/product.model.js"
import { asyncHandler } from './../../../utils/asyncHandler.js';

// ======================================= Create Product =======================================
export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, images, seller, category, stock } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    images,
    seller,
    category,
    stock,
  });

  await newProduct.save();

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product: newProduct,
  });
});

// ================= get all product ===================================

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();

  if (!products.length) {
    return next(new Error('No products found', { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: 'All products fetched successfully',
    products,
  });
});

// ==================== get one product ==========================================================================================

export const getProductById = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new Error('Product not found', { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    product,
  });
});


// ======================================= Update Product =======================================
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const updatedData = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new Error('Product not found', { cause: 404 }));
  }

  Object.assign(product, updatedData);
  await product.save();

  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  });
});

// ======================================= Delete Product =======================================
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new Error('Product not found', { cause: 404 }));
  }

  await product.remove();

  return res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
