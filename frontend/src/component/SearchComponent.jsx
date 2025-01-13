import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { categories } from "./category";
import Location from "./Location";

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    setSearchQuery("")
    // Normalize the search query
    const query = searchQuery.trim().toLowerCase();

    // Find the category or subcategory that matches the search query
    const foundCategory = categories.find(
      (category) =>
        category.name.toLowerCase() === query ||
        category.subcategories.some(
          (subcat) => subcat.name.toLowerCase() === query
        )
    );

    if (foundCategory) {
      // If found, navigate to the appropriate route
      if (foundCategory.name.toLowerCase() === query) {
        navigate(`/category/${foundCategory.id}`);
      }
      else {
        const foundSubcategory = foundCategory.subcategories.find(
          (subcat) => subcat.name.toLowerCase() === query
        );
        navigate(`/${foundCategory.name}/${foundSubcategory.name}`);
      }
    } else {
      // If not found, show an error message
      setError("Category and Subcategory not found.");
    }
  };

  return (
    <div>
      {/* Location icon for smaller screens */}
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center bg-white rounded-full p-1"
      >
        <div>
          <Location />
        </div>
        <input
          type="text"
          placeholder="Search for category or subcategory"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 rounded-l-full text-teal-500 focus:outline-none text-sm md:text-md"
        />
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded-full hover:bg-rose-600"
        >
          <FiSearch size={20} />
        </button>
      </form>
      {error && <p className="text-xs text-rose-200 flex justify-center mt-3">{error}</p>}
    </div>
  );
}

export default SearchComponent;
