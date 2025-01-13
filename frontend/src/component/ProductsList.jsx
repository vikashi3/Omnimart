import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaArrowRight } from 'react-icons/fa';
import useUserData from "./useUserData";
import useAddFav from "./useAddFav.js";
import useAddToCart from "./useAddtoCart.js";
import { useNavigate } from "react-router-dom";
import { FaSmile } from 'react-icons/fa';

const ProductList = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const {favorites,setFavorites, userId, cart, setCart, accountType} = useUserData();
  const { handleFav } = useAddFav(favorites, setFavorites, userId);
  const { handleAddToCart } = useAddToCart(cart, setCart, userId, accountType);

  const handleProductClick = (id)=> {
    navigate(`/product/${id}`)
  }

  useEffect(() => {
    if (category && subcategory) {
      // axios.get(`https://omnimart.up.railway.app/api/products/${category}/${subcategory}`)
      axios.get(`${import.meta.env.VITE_APP_URL}/api/products/${category}/${subcategory}`)
        .then(response => setProducts(response.data)
      )
        .catch(error => console.error('Error fetching products', error));
    }
  }, [category, subcategory]);

  return (
    <div className="bg-slate-200 w-full min-h-screen mx-auto p-4">
      {products.length > 0 ? (
        <div className="flex flex-wrap justify-center mt-16 gap-4">
          {products.map((deal) => (
            <div
            key={deal._id}
            className="bg-white min-w-40 w-auto sm:w-96 h-auto p-4 flex-wrap rounded-sm shadow-md flex-col min-w-md flex"
            >
            <img
              src={deal.imageUrl}
              onClick={()=>{handleProductClick(deal._id)}}
              alt={deal.productName}
              className="h-40 w-full mb-2 object-contain rounded-lg cursor-pointer"
            />
            <div className="flex items-center justify-between">
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
            <div className="w-full flex flex-col sm:flex-row mt-1 justify-between items-start sm:items-center">
              <span className="text-md font-semibold mb-2 sm:mb-0">
                ₹{deal.offerPrice.toFixed(2)}
              </span>
              <span className="text-xs text-slate-700 line-through mb-2 sm:mb-0">
                M.R.P ₹{deal.actualPrice.toFixed(2)}
              </span>
              <span className="text-sm text-red-500 bg-rose-500 text-white px-2 rounded-sm font-semibold">
                {(((deal.actualPrice - deal.offerPrice) / deal.actualPrice) *
            100
          ).toFixed(0)}% Off
              </span>
            </div>
            <div className="w-full">
              <p className="line-clamp-2 text-sm mb-2 sm:mb-0">
                {deal.description}
              </p>
            </div>
            <Link
              to={`/product/${deal._id}`}
              className="flex text-sm items-center font-semibold text-blue-500"
            >
              View Product
              <FaArrowRight className="ml-2 mt-1 text-blue-500" />
            </Link>

            {cart.includes(deal._id) ? (
              <button
                onClick={() => {
                  handleAddToCart(deal);
                }}
                className="bg-orange-600 w-32 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-2"
              >
                Remove from cart
              </button>
            ) : (
              <button
                onClick={() => {
                  handleAddToCart(deal);
                }}
                className="bg-primary w-24 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-2"
              >
                Add to Cart
              </button>
            )}
          </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center min-h-96 justify-center">
        <FaSmile size={70} className="text-gray-400 mb-4" />
        <p className="text-lg font-semibold text-gray-600">
          No products added yet. <br />
          <span className="text-teal-500">Products will be added soon!</span>
        </p>
      </div>      )}
    </div>
  );
};

export default ProductList;
