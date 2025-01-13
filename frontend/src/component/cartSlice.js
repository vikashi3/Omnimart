import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, description, price, image } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        state.cart.push({
          id,
          name,
          description,
          price,
          image,
          quantity: 1 // Set initial quantity to 1 for new items
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Increase the quantity of the item
      }
    },
    decreaseQuantity(state, action) {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1; // Decrease quantity
        } else {
          // Remove the item if quantity is 1 and decremented
          state.cart.splice(itemIndex, 1); // Use splice to remove the specific item
        }
      }
    },
    setCart(state, action) {
      state.cart = action.payload.map(item => ({
        id: item._id,  
        name: item.productName,
        description: item.description,
        price: item.offerPrice, 
        image: item.imageUrl,
        quantity: 1
      }));
    }
  } 
});

// Export actions for use in components
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart } = cartSlice.actions;

// Export reducer to be included in the store
export default cartSlice.reducer;
