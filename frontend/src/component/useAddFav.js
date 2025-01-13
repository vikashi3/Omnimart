import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function useAddFav(favorites, setFavorites, userId) {
  const { accountType } = useSelector((state) => state.auth);
  
  const handleFav = async (dealId) => {
    if (!userId) {
      toast.warn("Please sign in first.");
      navigate("/signin");
      return;
    } else if (accountType === "business") {
      toast.error("Please log in with a user account.");
      return;
    }
    const isFavoriting = !favorites.includes(dealId);
    const updatedFavorites = isFavoriting
      ? [...favorites, dealId] 
      : favorites.filter((id) => id !== dealId);
    setFavorites(updatedFavorites);

    try {
      await axios.put(
        // `https://omnimart.up.railway.app/api/products/updateFavorites/${userId}`,
        `${import.meta.env.VITE_APP_URL}/api/products/updateFavorites/${userId}`,
        { favorites: updatedFavorites }
      );

      // Show a toast message based on the action
      toast.success(isFavoriting ? "Added to favorites" : "Removed from favorites");
    } catch (error) {
      console.error("Error updating favorites", error);
      toast.error("Could not update favorites");

      // Revert to the previous favorites state in case of failure
      setFavorites(favorites);
    }
  };

  return { handleFav };
}

export default useAddFav;
