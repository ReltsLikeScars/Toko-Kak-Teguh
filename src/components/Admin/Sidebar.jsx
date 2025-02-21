import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaClipboardList, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clearing auth tokens, user state, etc.)
    console.log("User logged out");
    navigate("/"); // Redirect to the homepage
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Products", path: "/products", icon: <FaBox /> },
    { name: "Contact", path: "/orders", icon: <FaClipboardList /> },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Sidebar */}
      <div className={`fixed md:relative w-64 bg-gray-800 text-white h-screen shadow-md flex flex-col justify-between transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold p-4 mb-10 border-b border-gray-700 text-center">Admin Panel</h2>
          {/* Menu Items */}
          <ul className="p-4 space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-md hover:bg-gray-700 transition ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-4">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4 text-sm text-gray-400">
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
          <p className="mt-4 text-center">&copy; 2025 Admin Panel</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
