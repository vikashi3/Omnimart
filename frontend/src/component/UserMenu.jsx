import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserMenu = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { accountType } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully")
    navigate("/")
  };

  return (
    <div className=" inline-block">
      <div
        className="cursor-pointer p-4"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <FaRegUser className="inline p-1.5 bg-primary hover:bg-rose-400 rounded-full" size={32} />
      </div>

      {showMenu && (
        <div
          className="absolute right-0 -mt-2 w-40 bg-white border rounded shadow-lg z-20"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <ul>
            <li
              className="block px-4 py-2 text-sm font-semibold text-teal-500 hover:text-white rounded hover:bg-rose-400 cursor-pointer"
              onClick={() => navigate("/profile") & setShowMenu(false)}
            >
              Profile
            </li>
            {accountType && accountType === "business" ? (
            <li
              className="block px-4 py-2 text-sm font-semibold text-teal-500 hover:text-white rounded hover:bg-rose-400 cursor-pointer"
              onClick={() => navigate("/myproducts") & setShowMenu(false)}
            >
              My Products
            </li>
            ) : (
              <li
              className="block px-4 py-2 text-sm font-semibold text-teal-500 hover:text-white rounded hover:bg-rose-400 cursor-pointer"
              onClick={() => navigate("/myfavorites") & setShowMenu(false)}
            >
              My Favorites
            </li>
            )}
            <li
              className="block px-4 py-2 text-sm text-teal-500 hover:text-white rounded hover:bg-rose-400 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
