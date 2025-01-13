import axios from "axios";
import useFetchCart from "./useFetchCart";
import useUserData from "./useUserData";

function useRemoveFromCart(id) {
    const { userId } = useUserData();
    const { fetchCart } = useFetchCart();

    const handleRemoveFromCart = async () => {
        try {
            // const response = await axios.delete(`https://omnimart.up.railway.app/api/auth/removeFromCart/${userId}/${id}`);
            const response = await axios.delete(`${import.meta.env.VITE_APP_URL}/api/auth/removeFromCart/${userId}/${id}`);
            // console.log("Item removed:", response.data);
            dispatch(setCart(response.data)); // Dispatch the setCart action with fetched data
            // Refetch cart data after removing item, if needed
            fetchCart();
        } catch (error) {
            console.error("Error removing from cart:", error.response?.data || error.message);
        }
    };

    return handleRemoveFromCart;
}

export default useRemoveFromCart;
