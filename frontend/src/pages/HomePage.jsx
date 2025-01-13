import React from "react";
import TopDeals from "../component/TopDeals";
import Category from "../component/Category.jsx";
import "./bgAnimate.css";

const HomePage = () => {
  return (
    <div className="bgAnimate bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="animated-background text-white flex-1 flex items-center justify-center py-12 md:py-16">
        <div className="flex flex-col justify-center h-60 mx-auto text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover the Best Deals in Your City
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Find amazing discounts, explore events, and uncover hidden gems
            around you.
          </p>
        </div>
      </section>

      {/* Top Deals Section */}
      <div id="explore" className="mt-4 sm:px-2">
        <TopDeals />
      </div>

      {/* Category Section */}
      <div id="category" className="mt-4 sm:px-2">
        <Category />
      </div>
    </div>
  );
};

export default HomePage;
