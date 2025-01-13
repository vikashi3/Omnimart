const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BusinessCard = require("../models/businessCard.js");
require('dotenv').config();

const createToken = (user) => {
  // console.log(user)
  if (!process.env.SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined. Please set it in the environment variables.');
  }
  return jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: '1h' });
};

exports.signup = async (req, res) => {
  const { accountType, firstName, lastName, phone, email, password } = req.body;
  if (password.length < 6) {
    return res.status(400).send("Password must be 6 characters long.");
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already registered, please login.");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      accountType,
      firstName,
      lastName,
      phone,
      email,
      password: hashPassword,
    });
    const token = createToken({
      id: newUser._id,
      email: newUser.email,
      accountType: newUser.accountType,
    });
    res.status(201).send(token);
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).send("Server error");
  }  
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not registered, please Signup.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password.");
    }
    const token = createToken({
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    });
    res.status(200).send({ token });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).send("Server error");
  }
};

exports.getuser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("ID is missing from request parameters.");
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
};

exports.myproducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!user.businessCard || user.businessCard.length === 0) {
      return res
        .status(404)
        .send({ message: "No business cards found for this user" });
    }
    const productIds = user.businessCard.map((card) => card.toString());
    const products = await BusinessCard.find({ _id: { $in: productIds } });
    console.log(products);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .send({ message: "No products found for the provided business cards" });
    }
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Server error" });
  }
};

exports.myfavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and check if they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("user is :", user);

    // Check if the user has any favorite products
    if (!user.favorites || user.favorites.length === 0) {
      return res
        .status(404)
        .json({ message: "No favorite products for this user" });
    }

    // Fetch favorite products by their IDs from the BusinessCard model
    const products = await BusinessCard.find(
      {
        "products._id": { $in: user.favorites },
      },
      { "products.$": 1 }
    ); // Return only the matched products
    // console.log("product is :", products);
    // If no products are found
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the provided User" });
    }

    // Extract the products array from each matched BusinessCard document
    const favoriteProducts = products.map((card) => card.products[0]);
    // console.log("fav product is :", favoriteProducts);

    res.status(200).json(favoriteProducts);
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.mycart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and check if they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user is :", user);

    // Check if the user has any cart products
    if (!user.cart || user.cart.length === 0) {
      return res
        // .status(404)
        .json({ message: "No cart products for this user" });
    }

    // Fetch favorite products by their IDs from the BusinessCard model
    const products = await BusinessCard.find(
      {
        "products._id": { $in: user.cart },
      },
      { "products.$": 1 }
    ); // Return only the matched products
    // console.log("product is :", products);
    // If no products are found
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the provided User" });
    }

    // Extract the products array from each matched BusinessCard document
    const cartProducts = products.map((cart) => cart.products[0]);
    // console.log("fav product is :", favoriteProducts);

    res.status(200).json(cartProducts);
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  console.log(req.params)
    try {
      const { userId, productId } = req.params;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      console.log("deleted",user)
  
      // Ensure the product is in the user's cart before trying to remove it
      const productIndex = user.cart.indexOf(productId);
      if (productIndex === -1) {
        return res.status(404).send({ message: "Product not found in user's cart" });
      }
  
      user.cart.splice(productIndex, 1); // Remove the product ID from the cart
      
      await user.save(); // Save the updated user document
  
      res.status(200).send( user.cart );
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).send({ message: "Server error" });
    }
  };
  

  exports.removeFromFav = async (req, res) => {
  console.log(req.params)
    try {
      const { userId, productId } = req.params;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      console.log("deleted",user)
  
      // Ensure the product is in the user's cart before trying to remove it
      const productIndex = user.favorites.indexOf(productId);
      if (productIndex === -1) {
        return res.status(404).send({ message: "Product not found in user's cart" });
      }
  
      user.favorites.splice(productIndex, 1); // Remove the product ID from the cart
      
      await user.save(); // Save the updated user document
  
      res.status(200).send( user.favorites );
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).send({ message: "Server error" });
    }
  };
  
