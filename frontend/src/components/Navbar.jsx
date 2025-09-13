// import React, { useContext, useState } from 'react'
// import {assets} from '../assets/assets'
// import { Link, NavLink } from 'react-router-dom'
// import { ShopContext } from '../context/ShopContext';

// const Navbar = () => {

//     const [visible,setVisible] = useState(false);

//     const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

//     const logout = () => {
//         navigate('/login')
//         localStorage.removeItem('token')
//         setToken('')
//         setCartItems({})
//     }

//   return (
//     <div className='flex items-center justify-between py-5 font-medium'>
      
//       <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

//       <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        
//         <NavLink to='/' className='flex flex-col items-center gap-1'>
//             <p>HOME</p>
//             <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <NavLink to='/collection' className='flex flex-col items-center gap-1'>
//             <p>COLLECTION</p>
//             <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <NavLink to='/about' className='flex flex-col items-center gap-1'>
//             <p>ABOUT</p>
//             <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>
//         <NavLink to='/contact' className='flex flex-col items-center gap-1'>
//             <p>CONTACT</p>
//             <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
//         </NavLink>

//       </ul>

//       <div className='flex items-center gap-6'>
//             <img onClick={()=> { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            
//             <div className='group relative'>
//                 <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
//                 {/* Dropdown Menu */}
//                 {token && 
//                 <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
//                     <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded'>
//                         <p className='cursor-pointer hover:text-black'>My Profile</p>
//                         <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
//                         <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
//                     </div>
//                 </div>}
//             </div> 
//             <Link to='/cart' className='relative'>
//                 <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
//                 <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
//             </Link> 
//             <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" /> 
//       </div>

//         {/* Sidebar menu for small screens */}
//         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
//                 <div className='flex flex-col text-gray-600'>
//                     <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
//                         <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
//                         <p>Back</p>
//                     </div>
//                     <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
//                     <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
//                     <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
//                     <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
//                 </div>
//         </div>

//     </div>
//   )
// }

// export default Navbar
import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dark, setDark] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  // Apply dark mode to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setOpenProfile(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-2 py-1 relative ${
      isActive ? "text-indigo-600 font-semibold" : "text-gray-700 dark:text-gray-200"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4 font-medium">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} className="w-32" alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6 text-sm">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/collection" className={navLinkClass}>Collection</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <button
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
          >
            <img src={assets.search_icon} className="w-5" alt="search" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark((v) => !v)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <img
              onClick={() => (token ? setOpenProfile((p) => !p) : navigate("/login"))}
              className="w-6 cursor-pointer"
              src={assets.profile_icon}
              alt="profile"
            />
            {token && openProfile && (
              <div className="absolute right-0 mt-3 w-40 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 z-50">
                <p className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400">
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/orders");
                    setOpenProfile(false);
                  }}
                  className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-6" alt="cart" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={() => setVisible(true)} className="sm:hidden">
            <img src={assets.menu_icon} className="w-6" alt="menu" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      >
        <div
          className={`absolute top-0 right-0 h-full bg-white dark:bg-gray-900 shadow-lg w-64 p-5 transition-transform ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setVisible(false)}
            className="mb-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕ Close
          </button>
          <div className="flex flex-col gap-4 text-gray-700 dark:text-gray-200">
            <NavLink to="/" onClick={() => setVisible(false)}>Home</NavLink>
            <NavLink to="/collection" onClick={() => setVisible(false)}>Collection</NavLink>
            <NavLink to="/about" onClick={() => setVisible(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setVisible(false)}>Contact</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
