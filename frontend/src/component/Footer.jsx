import { Link } from "react-router-dom";
import { categories } from "./category.js";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialGoogle } from "react-icons/sl";
import { FcAbout } from "react-icons/fc";
import { FcContacts } from "react-icons/fc";
// Ensure to import categories correctly

const Footer = () => {
  return (
    <footer className="w-full bg-teal-500 text-white p-5">
      <div className="container mx-auto flex flex-col flex-wrap text-white justify-between">
        {/* Categories Section */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="flex flex-wrap gap-12 justify-around items-start mt-5">
            {categories.map((category) => (
              <div key={category.id} className="mb-4">
                <Link to={`/category/${category.id}`}>
                  <h4 className="font-semibold text-md">{category.name}</h4>
                </Link>
                <ul className="mt-2">
                  {category.subcategories.map((subcategory) => (
                    <li
                      className="text-white hover:text-highlight transition text-xs"
                      key={subcategory.id}
                    >
                      <Link to={`/${category.name}/${subcategory.name}`}>
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="w-full flex flex-col items-center justify-center mb-8">
          <h3 className="text-lg font-bold mb-4">Social Media</h3>
          <div className="flex items-center gap-4">
            <SlSocialFacebook />
            <Link
              to="https://www.facebook.com/vbachhety"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-md hover:text-highlight transition"
            >
              Facebook
            </Link>
            <SlSocialInstagram />
            <Link
              to="https://www.instagram.com/vbachhety/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-md hover:text-highlight transition"
            >
              Instagram
            </Link>
            <SlSocialGoogle />
            <Link
              to="https://bachhety@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-md hover:text-highlight transition"
            >
              Google
            </Link>
          </div>
        </div>

        {/* Contact and About Us Section */}
        {/* <div className="w-full flex flex-col items-center justify-center mb-8">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <FcContacts />
              <Link
                to="/contact"
                className="text-white text-md hover:text-highlight transition"
              >
                Contact Us
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FcAbout />
              <Link
                to="/aboutUs"
                className="text-white text-md hover:text-highlight transition"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="container mx-auto text-center">
          <p className="text-xs">&copy; 2024 Omnimart. All Rights Reserved.</p>
          <div className="mt-2">
            <a to="#privacy" className="text-xs hover:text-primary mx-2">
              Privacy Policy
            </a>
            <a to="#terms" className="text-xs hover:text-primary mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
