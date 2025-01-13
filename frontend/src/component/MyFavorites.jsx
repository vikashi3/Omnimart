import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useUserData from "./useUserData.js";
import { IoIosHeart } from "react-icons/io";
import favorite from '../assets/favorite.png';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { favorites, userId } = useUserData();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isLoggedIn || !token) return;
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        const response = await axios.get(
          // `https://omnimart.up.railway.app/api/auth/${userId}/myfavorites`
          `${import.meta.env.VITE_APP_URL}/api/auth/${userId}/myfavorites`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'Failed to fetch products');
        } else {
          setError('Network error');
        }
        setLoading(false);
      }
    };
    fetchProducts();
  }, [isLoggedIn, token, userId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div>Loading...</div></div>;
  }

  const handleRemoveFav = async (id) => {
    try {
      await axios.delete(
        // `https://omnimart.up.railway.app/api/auth/removeFromFav/${userId}/${id}`
        `${import.meta.env.VITE_APP_URL}/api/auth/removeFromFav/${userId}/${id}`
      );
      // Update the products state
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleProductClick = (id)=> {
    navigate(`/product/${id}`)
  }

  return (
    <div className="w-full bg-blue-200 min-h-screen mx-auto p-4">
      {products && products.length > 0 ? (
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl mt-6 font-bold mb-8">My Favorites</h2>
          <div className="flex-wrap flex gap-8 items-center justify-center sm:p-8 w-full">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white min-w-sm w-96 h-auto p-3 flex-wrap rounded-lg shadow-md flex-col min-w-md flex"
              >
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  onClick={()=>{handleProductClick(product._id)}}
                  className="h-48 w-full object-contain mb-4 rounded-lg"
                />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {product.productName}
                </h3>
                <p className="text-gray-700 mb-2">
                  <b>Price</b>: ₹{product.actualPrice}
                </p>
                <p className="text-gray-700 mb-2">
                  <b>Offer Price</b>: ₹{product.offerPrice}
                </p>
                <p className="text-gray-600 line-clamp-5 mb-4">
                  <b>Description</b>: {product.description}
                </p>
                {favorites.includes(product._id) && (
                  <IoIosHeart
                    size={32}
                    className="text-rose-500 cursor-pointer"
                    onClick={() => handleRemoveFav(product._id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='h-screen sm:h-[80vh] flex flex-col justify-center items-center'>
          <img className="w-20" src={favorite} alt="empty-cart" />
          <p className="text-lg font-semibold text-gray-700 mt-4">
            No favorite product available.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
