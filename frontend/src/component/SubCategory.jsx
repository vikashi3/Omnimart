import { Link, useParams } from "react-router-dom";
import { categories } from "./category.js";

const SubCategory = () => {
  const { id } = useParams();
  const category = categories.find((cat) => cat.id === parseInt(id));
  const subcategories = category ? category.subcategories : [];

  return (
    <div className="bg-blue-200 min-h-screen p-4 sm:p-8 my-2">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        {category ? category.name : "Subcategories"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="bg-white w-full h-auto p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={subcategory.image || 'default-image-url'}
              alt={subcategory.name}
              className="w-full h-36 object-contain rounded-lg"
            />
            <div className="p-4 flex flex-col items-center w-full">
              <h3 className="text-lg font-bold text-center">{subcategory.name}</h3>
              <p className="text-teal-500 truncate text-sm mb-4 w-full text-center">
                {truncate(subcategory.description, { length: 100, separator: " " })}
              </p>
              <Link
                to={`/${category.name}/${subcategory.name}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to truncate text
const truncate = (text, options) => {
  const { length, separator } = options;
  if (text.length <= length) return text;
  return text.slice(0, length) + (separator ? separator : '...');
};

export default SubCategory;
