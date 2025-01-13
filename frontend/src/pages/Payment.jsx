import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';

function Payment() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const totalAmount = useSelector(state => state.cart.cart.reduce((total, item) => total + item.price * item.quantity, 0));

  const validateExpiryDate = (value) => {
    const [month, year] = value.split('/');
    const expDate = new Date(`20${year}-${month}-01`);
    return expDate > new Date() || 'Expiry date cannot be in the past';
  };

  const onSubmit = (data) => {
    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsPaymentSuccessful(true);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className='bg-slate-200 flex flex-col justify-center items-center w-full p-6 md:p-28'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Payment Details</h2>
        <p className='text-xl font-semibold text-gray-700 mb-4'>Total Amount: {totalAmount}₹</p>
        {isPaymentSuccessful ? (
          <div className='flex flex-col items-center'>
            <FaCheckCircle className='text-green-500 text-6xl mb-4' />
            <p className='text-green-500 text-2xl font-semibold'>Hurray! Payment Success</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Card Number */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Card Number</label>
              <input
                type='text'
                {...register('cardNumber', {
                  required: 'Card number is required',
                  pattern: {
                    value: /^\d{16}$/,
                    message: 'Please enter a valid 16-digit card number',
                  }
                })}
                className='w-full px-3 py-2 border rounded-lg'
                placeholder='1234 5678 9012 3456'
                maxLength={16}
              />
              {errors.cardNumber && <p className='text-red-500 text-sm'>{errors.cardNumber.message}</p>}
            </div>

            {/* Expiry Date and CVV */}
            <div className='flex gap-4 mb-4'>
              {/* Expiry Date */}
              <div className='flex-1'>
                <label className='block text-gray-700 font-semibold mb-2'>Expiry Date</label>
                <input
                  type='text'
                  {...register('expiryDate', {
                    required: 'Expiry date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                      message: 'Expiry date must be in MM/YY format',
                    },
                    validate: validateExpiryDate,
                  })}
                  className='w-full px-3 py-2 border rounded-lg'
                  placeholder='MM/YY'
                  maxLength={5}
                />
                {errors.expiryDate && <p className='text-red-500 text-sm'>{errors.expiryDate.message}</p>}
              </div>

              {/* CVV */}
              <div className='flex-1'>
                <label className='block text-gray-700 font-semibold mb-2'>CVV</label>
                <input
                  type='text'
                  {...register('cvv', {
                    required: 'CVV is required',
                    pattern: {
                      value: /^\d{3}$/,
                      message: 'CVV must be 3 digits',
                    }
                  })}
                  className='w-full px-3 py-2 border rounded-lg'
                  placeholder='123'
                  maxLength={3}
                />
                {errors.cvv && <p className='text-red-500 text-sm'>{errors.cvv.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isProcessing}
              className={`w-full py-2 rounded-lg transition-colors ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Payment;
