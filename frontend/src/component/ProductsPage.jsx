// import { useParams } from 'react-router-dom';
// import { categories } from './category.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from './cartSlice.js';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import { IoIosHeartEmpty } from "react-icons/io";
// import "react-toastify/dist/ReactToastify.css";

// function ProductsPage() {
//   const { isLoggedIn, accountType } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { subcategoryId } = useParams();
//   const subcategoryIdNumber = parseInt(subcategoryId);

//   let subcategory = null;

//   for (const category of categories) {
//     subcategory = category.subcategories.find(sub => sub.id === subcategoryIdNumber);
//     if (subcategory) break;
//   }

//   if (!subcategory) {
//     return <p>Subcategory not found</p>;
//   }

//   const handleAddToCart = async (product) => {

//     const updatedCarts = cart.includes(product.id)
//       ? cart.filter(id => id !== product.id) // Remove from favorites
//       : [...cart, product.id]; // Add to favorites

//     setFavorites(updatedCarts); // Update local state

//     try {
//       // Make API call to update favorites in the database
//       await axios.put(`https://omnimart.up.railway.app/api/products/updateCart/${userId}`, {
//         cart: updatedCarts,
//       });
//       // Notify user about the change
//       toast.success(cart.includes(product.id) ? "Removed from favorites" : "Added to favorites");
//     } catch (error) {
//       console.error('Error updating favorites', error);
//       toast.error("Could not update favorites");
//     }

//     if (!isLoggedIn) {
//       navigate('/signin');
//       return;
//     } else if (isLoggedIn && accountType === 'business') {
//       toast.warn("This is a business account!");
//       return;
//     }

//     dispatch(addToCart({
//       id: product.id,
//       name: product.productName,
//       description: product.description,
//       price: product.offerPrice,
//       image: product.imageUrl
//     }));
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">{subcategory.productName}</h1>
//       <p className="mb-6 text-lg text-gray-700">{subcategory.description}</p>
//       <div className="flex flex-wrap gap-8">
//         {subcategory.products.map(product => (
//           <div
//             key={product.id}
//             className="w-full bg-white p-2 rounded-lg shadow-lg flex flex-col items-center max-w-sm border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
//           >
//             <img
//               src={product.imageUrl || 'path/to/default-image.jpg'}
//               alt={product.productName}
//               className="w-full h-48 object-cover mb-4 rounded-lg"
//             />
//             <div className="flex flex-col items-center w-full">
//               <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.productName}</h2>
//               {/* <IoIosHeartEmpty /> */}
//               <p className="text-sm text-gray-600 mb-4 text-center">{product.description}</p>
//               <p className="text-lg font-semibold mb-4 text-gray-900">₹{product.offerPrice.toFixed(2)}</p>
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductsPage;