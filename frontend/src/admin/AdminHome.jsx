import React from "react";
import { FaUsers, FaBriefcase, FaShoppingCart } from "react-icons/fa";

const AdminHome = () => {
  const cards = [
    {
      title: "Users",
      description: "Manage and view all users.",
      icon: <FaUsers className="text-4xl text-sky-500 group-hover:scale-110 transition-transform" />,
      image: "https://via.placeholder.com/150?text=Users",
      bgColor: "bg-gradient-to-br from-cyan-300 to-blue-400",
    },
    {
      title: "Business",
      description: "View and manage businesses.",
      icon: <FaBriefcase className="text-4xl text-purple-500 group-hover:scale-110 transition-transform" />,
      image: "https://via.placeholder.com/150?text=Business",
      bgColor: "bg-gradient-to-br from-purple-300 to-indigo-400",
    },
    {
      title: "Products",
      description: "Manage and list products.",
      icon: <FaShoppingCart className="text-4xl text-green-500 group-hover:scale-110 transition-transform" />,
      image: "https://via.placeholder.com/150?text=Products",
      bgColor: "bg-gradient-to-br from-green-300 to-teal-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-20">
      <h1 className="text-4xl font-bold text-center text-sky-600 mb-10">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 gap-20">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} relative group p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out`}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-30 group-hover:opacity-50 transition-opacity bg-center bg-cover rounded-xl" style={{ backgroundImage: `url(${card.image})` }}></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-4 rounded-full bg-white shadow-md mb-4">
                {card.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
              <p className="text-sm text-white mt-2 text-center">
                {card.description}
              </p>
              <button className="mt-4 py-2 px-4 bg-white text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
