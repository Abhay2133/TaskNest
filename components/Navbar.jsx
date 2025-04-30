import React from 'react';
import { MenuIcon } from 'lucide-react';

const Navbar = ({ toggelMenu }) => {
    return (
        <nav className="fixed top-0 w-full h-[50px] z-[999] flex items-center justify-between px-4 py-2 border-b border-blue-200 bg-white/70 backdrop-blur-md shadow-sm">
            {/* Menu Toggler */}
            <div className="md:hidden">
                <button
                    onClick={toggelMenu}
                    className="text-blue-700 hover:text-blue-900 active:scale-105 transition duration-150"
                >
                    <MenuIcon size={28} />
                </button>
            </div>

            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-start">
                <h1 className="text-xl md:text-2xl text-blue-800 font-semibold tracking-wide">
                TaskNest
                </h1>
            </div>
        </nav>
    );
};

export default Navbar;
