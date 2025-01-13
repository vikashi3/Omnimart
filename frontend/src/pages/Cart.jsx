import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../component/cartSlice.js';
import empty from '../assets/empty.png';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDeleteOutline } from "react-icons/md";
import useFetchCart from '../component/useFetchCart';
import useUserData from '../component/useUserData.js';
import axios from 'axios';
import { setCart } from '../component/cartSlice.js';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cart);
  const { userId } = useUserData();
  const [reload, setReload] = useState(false);

  useFetchCart(reload);

  const handleRemoveFromCart = async (id) => {
    try {
      // const response = await axios.delete(`https://omnimart.up.railway.app/api/auth/removeFromCart/${userId}/${id}`);
      const response = await axios.delete(`${import.meta.env.VITE_APP_URL}/api/auth/removeFromCart/${userId}/${id}`);
      console.log("Item removed:", response.data);
      
      // If the removed item makes the cart empty, dispatch an empty cart update
      if (response.data.length === 0 || cart.length === 1) {
        dispatch(setCart([])); // Empty the cart
      } else {
        setReload(prev => !prev); // Else reload the cart state
      }
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
    }
  };  

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='flex flex-col justify-start items-center min-h-screen w-full bg-slate-300 p-4'>
      {cart && cart.length > 0 ? (
        <div className="w-full max-w-5xl">
          {cart.map((product) => (
            <div
              key={product._id}
              className='flex flex-col sm:flex-row border border-slate-600 justify-between px-4 sm:px-6 lg:px-4 bg-white rounded-lg shadow-lg overflow-hidden my-2 w-full'>
              
              <div className='py-4 flex sm:flex-row items-start sm:items-center flex-1'>
                <img src={product.image} alt={product.name} className='w-32 h-24 object-contain rounded-md' />
                <h2 className='text-slate-600 text-md font-medium ml-0 sm:ml-5 mt-3 sm:mt-0'>{product.name}</h2>
              </div>
              
              <div className='py-4 flex-1 flex flex-col sm:flex-row items-center justify-between'>
                <p className='text-blue-400 text-xl px-10 font-semibold mb-2 sm:mb-0'>{product.price}₹</p>
                <div className='flex items-center gap-2 mx-5'>
                  <h2 className='text-slate-600 text-md font-medium'>Quantity</h2>
                  <button
                    onClick={() => handleDecreaseQuantity(product.id)}
                    className='bg-red-400 text-white px-2 pb-0.5 rounded-full font-bold hover:bg-red-500 transition-colors'>
                    -
                  </button>
                  <span className="text-slate-800 mx-2">{product.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(product.id)}
                    className='bg-green-400 text-white px-1.5 pb-0.5 rounded-full font-bold hover:bg-green-500 transition-colors'>
                    +
                  </button>
                </div>
                <MdOutlineDeleteOutline
                  className='mt-4 sm:mt-0 cursor-pointer text-red-600 hover:text-red-800 transition-colors'
                  onClick={() => handleRemoveFromCart(product.id)}
                  size={30}
                />
              </div>
            </div>
          ))}

          <div className='w-full flex-col flex sm:flex-row justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white rounded-lg shadow-lg mt-4'>
            <p className='text-2xl text-center font-semibold text-blue-400'>Total: {totalAmount}₹</p>
            <button
              onClick={() => navigate('/payment')}
              className='p-2 mt-2 sm:mt-0 bg-blue-700 text-white font-semibold hover:bg-blue-500 rounded-md'>
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className='h-screen sm:h-[80vh] flex flex-col justify-center items-center'>
          <img className='w-24' src={empty} alt="empty-cart" />
          <p className='text-lg font-semibold text-gray-700 mt-4'>Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
