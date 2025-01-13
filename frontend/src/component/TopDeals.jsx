import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useSelector } from "react-redux";
import useUserData from "./useUserData.js";
import useAddToCart from "./useAddtoCart.js";
import useAddFav from "./useAddFav.js";
import useFetchCart from "./useFetchCart.js";

const TopDeals = () => {
  const [deals, setDeals] = useState([]);
  const { accountType } = useSelector((state) => state.auth);
  const { cart, setCart, favorites, setFavorites, userId } = useUserData();
  const { handleFav } = useAddFav(favorites, setFavorites, userId);
  const { handleAddToCart } = useAddToCart(cart, setCart, userId, accountType);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useFetchCart();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          // `https://omnimart.up.railway.app/api/products/topdeals`
          `${import.meta.env.VITE_APP_URL}/api/products/topdeals`
        );
        setLoading(false);
        const allProducts = response.data.flatMap((item) => item.products);
        const productsWithDiscount = allProducts.map((product) => {
          const discountPercentage = (
            ((product.actualPrice - product.offerPrice) / product.actualPrice) *
            100
          ).toFixed(0);

          return {
            ...product,
            discountPercentage: Number(discountPercentage),
          };
        });
        const sortedProducts = productsWithDiscount.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
        // Limit to the top 8 products
        setDeals(sortedProducts.slice(0, 8));
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-yellow-100 min-h-auto pb-6 px-4 sm:mt-0 sm:px-6 lg:px-2">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold p-2 mb-6 text-center sm:text-3xl lg:text-4xl">
          Top Deals
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white w-80 p-4 rounded-md shadow-md flex flex-col sm:w-1/2 md:w-1/3 lg:w-72"
            >
              <img
                src={deal.imageUrl}
                onClick={() => handleProductClick(deal._id)}
                alt={deal.productName}
                className="h-40 w-full mb-4 object-contain rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-800">
                  {deal.productName.split(" ").slice(0, 2).join(" ")}
                </h3>
                {favorites.includes(deal._id) ? (
                  <IoIosHeart
                    size={24}
                    className="text-rose-500 cursor-pointer"
                    onClick={() => handleFav(deal._id)}
                  />
                ) : (
                  <IoIosHeartEmpty
                    size={24}
                    className="text-slate-500 cursor-pointer"
                    onClick={() => handleFav(deal._id)}
                  />
                )}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-md font-semibold">
                  ₹{deal.offerPrice.toFixed(2)}
                </span>
                <span className="text-sm text-slate-700 line-through">
                  M.R.P ₹{deal.actualPrice.toFixed(2)}
                </span>
                <span className="text-sm text-red-500 bg-rose-500 text-white px-2 rounded-sm font-semibold">
                  {deal.discountPercentage}% Off
                </span>
              </div>
              {cart.includes(deal._id) ? (
                <button
                  onClick={() => handleAddToCart(deal)}
                  className="bg-orange-600 w-40 mx-auto px-2 text-white text-sm py-1 rounded-lg"
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(deal)}
                  className="bg-primary w-40 mx-auto px-2 text-white text-sm py-1 rounded-lg"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
