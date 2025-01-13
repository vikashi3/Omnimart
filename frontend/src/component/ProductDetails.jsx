import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import useUserData from "./useUserData.js";
import useAddToCart from "./useAddtoCart.js";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { accountType } = useSelector((state) => state.auth);
  const { cart, setCart, userId } = useUserData();
  const { handleAddToCart } = useAddToCart(cart, setCart, userId, accountType);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          // `https://omnimart.up.railway.app/api/products/${id}`
          `${import.meta.env.VITE_APP_URL}/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="bg-white min-h-auto py-4">
      <div className="flex justify-center px-4">
        <div className="w-full flex flex-col items-center sm:flex-row lg:w-4/5 lg:text-justify gap-8">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="h-60 w-60 sm:h-1/2 sm:w-1/2 object-contain mb-4"
          />
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-4xl font-bold text-primary mb-4">
              {product.productName}
            </h1>

            <p className="text-lg mb-4">₹{product.offerPrice}</p>
            <p className="text-lg line-through mb-4"><b>MRP</b> ₹{product.actualPrice}</p>
            <p className="text-md mb-4">{product.description}</p>
            {cart.includes(product._id) ? (
                <button
                  onClick={() => { handleAddToCart(product) }}
                  className="bg-orange-600 hover:bg-primary w-32 px-2 text-white text-sm py-2 rounded-lg mx-auto mt-4">
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => { handleAddToCart(product) }}
                  className="bg-primary w-24 px-2 text-white text-sm py-2 hover:bg-orange-600 rounded-lg mx-auto mt-4">
                  Add to Cart
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;