import React, { useState } from "react";
import Logo2 from "../assets/Logo2.png";
import { IoMdSearch } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import Login from "./Login";

const NavMenu = [
    {
        id: 1,
        title: "Home",
        path: "/hero",
        delay: 0.1
    },
    {
        id: 2,
        title: "About",
        path: "/about",
        delay: 0.2,
    },
    {
        id: 3,
        title: "Menu",
        path: "/produk",
        delay: 0.3,
    },
    {
        id: 4,
        title: "Contact Us",
        path: "/contact",
        delay: 0.4,
    },
    {
        id: 5,
        title: "Cart",
        path: "/cart",
        delay: 0.4,
    },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="shadow-md bg-white dark:bd-gray-900 dark:text-white duration-200 relative z-40">
            <div className="bg-blue-300 py-2">
                <div className="container flex justify-between items-center">
                    <div>
                        <a href="#"
                        className="font-bold text-2xl sm:text-3xl flex gap-2 text-black">
                            <img src={Logo2} alt="Logo" 
                            className="w-10 uppercase"/>
                            T.teguh
                        </a>
                    </div>
                       <div className="flex items-center gap-4">
                       <div className="sm:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-2xl text-black ">
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                        
                        <button>
                            <Login />
                        </button>

                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`sm:hidden fixed top-0 left-0 w-full h-full bg-white shadow-md transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleMenu} className="text-2xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md">
                        <FaTimes />
                    </button>
                </div>
                <ul className="flex flex-col items-center py-4 gap-4">
                    {NavMenu.map(menu => (
                        <li key={menu.id}>
                            <a href={menu.path} className="block px-4 py-2 text-black hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                {menu.title}
                            </a>
                        </li>
                    ))}
                    <li>
                        <div className="block px-4 py-2 text-black hover:text-blue-600">
                            <Login />
                        </div>
                    </li>
                </ul>
            </div>
            {/* Desktop Menu */}
            <div className="justify-center hidden sm:flex">
                <ul className="flex items-center gap-4">
                    {NavMenu.map((menu) => (
                        <li key={menu.id} className="nav-menu" data-delay={menu.delay}>
                            <a href={menu.path} className="inline-block px-4 hover:text-blue-600 duration-200 text-black">
                                {menu.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
