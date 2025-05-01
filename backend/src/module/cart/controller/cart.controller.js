import { asyncHandler } from '../../../utils/asyncHandler.js';
import cartModel from './../../../../DB/models/Cart.model.js';
import productModel from './../../../../DB/models/product.model.js';

export const addToCart = asyncHandler(async (req, res, next) => {
  const { products } = req.body; // Expecting { products: [{ productId, quantity }, ...] }

  if (!req.user || !req.user._id) {
    return next(new Error("Please login first", { cause: 401 }));
  }

  if (!products || !Array.isArray(products)) {
    return next(new Error("Invalid input: products must be an array", { cause: 400 }));
  }

  let cart = await cartModel.findOne({ userId: req.user._id });

  if (!cart) {
    // Create a new cart
    cart = await cartModel.create({
      userId: req.user._id ,
      products: []
    });
}

  for (const i in products) {
    console.log(products[i].productId)
}

  for (const { productId, quantity = 1 } of products) {
    // Validate product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return next(new Error(`Product not found: ${productId}`, { cause: 404 }));
    }

    // Check if the product already exists in the cart
    const existProduct = cart.products.find(p => p.productId.equals(productId));

    if (existProduct) {
      existProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }



  await cart.save();

  res.status(201).json({ message: "Successfully added to cart", cart });
});



export const allCart = asyncHandler(
    async(req,res,next) => {
        if (!req.user || !req.user._id) {
            return next(new Error("Please login first", { cause: 401 }));
          }
        const cart = await cartModel.find({userId :req.user._id })
        res.status(200).json({message : "sucess" , cart})
        
    }
)


export const updateCart = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new Error("Please login first", { cause: 401 }));
  }

  const { productId, quantity } = req.body;

  if (!productId || quantity === undefined || quantity < 1) {
    return next(new Error("Invalid input: productId and quantity (minimum 1) are required", { cause: 400 }));
  }

  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new Error("Cart not found", { cause: 404 }));
  }

  // Validate product exists
  const product = await productModel.findById(productId);
  if (!product) {
    return next(new Error(`Product not found: ${productId}`, { cause: 404 }));
  }

  // Find product in cart
  const cartProduct = cart.products.find(p => p.productId.equals(productId));
  if (!cartProduct) {
    return next(new Error("Product not found in cart", { cause: 404 }));
  }

  // Update quantity
  cartProduct.quantity = quantity;

  await cart.save();

  res.status(200).json({ message: "Cart updated successfully", cart });
});

export const removeFromCart = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new Error("Please login first", { cause: 401 }));
  }

  const { productId } = req.body;

  if (!productId) {
    return next(new Error("Invalid input: productId is required", { cause: 400 }));
  }

  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new Error("Cart not found", { cause: 404 }));
  }

  // Find product index in cart
  const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
  if (productIndex === -1) {
    return next(new Error("Product not found in cart", { cause: 404 }));
  }

  // Remove product from cart
  cart.products.splice(productIndex, 1);

  await cart.save();

  res.status(200).json({ message: "Product removed from cart successfully", cart });
});