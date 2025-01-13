import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

function useUserData() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      const decodedUser = jwtDecode(token);
      const id = decodedUser.user.id;
      setUserId(id);
    }
  }, []); 

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          setLoading(true);
          const response = await axios.get(
            // `https://omnimart.up.railway.app/api/auth/getuser/${userId}`
            `${import.meta.env.VITE_APP_URL}/api/auth/getuser/${userId}`
          );
          setCart(response.data.cart || []);
          setFavorites(response.data.favorites || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data."); // Set error state
        } finally {
          setLoading(false); // Always stop loading, regardless of success or failure
        }
      }
    };

    fetchUserData();
  }, [userId]);

  return { cart, setCart, setFavorites, favorites, userId, loading, error };
}

export default useUserData;
