import { Link } from "react-router-dom";
import { categories } from "./category.js";

const Category = () => {
  return (
    <div className="bg-teal-100 min-h-screen pb-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold p-2 mb-4 text-center sm:text-3xl md:text-4xl">
          Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-md shadow-md flex flex-col w-80 sm:w-1/2 md:w-1/3 lg:w-72"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                {category.name}
              </h3>
              <p className="text-teal-500 text-sm mb-4 truncate w-full text-center">
                {category.description}
              </p>
              <Link
                to={`/category/${category.id}`}
                className="bg-primary text-white py-1 px-4 rounded-lg hover:bg-highlight transition mx-auto text-center"
              >
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
