import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '../../assets/HomeIcon.png';
import { useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { IoDocumentAttach } from 'react-icons/io5';
import { IoMdAddCircle } from 'react-icons/io';
import { MdFactory } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
import { GoSignOut } from "react-icons/go";


const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/dashboard/documentations', label: 'Documentations', icon: <IoDocumentAttach /> },
    { to: '/dashboard/my_companies', label: 'My Companies', icon: <MdFactory /> },
    { to: '/dashboard/add_company', label: 'Add Company', icon: <IoMdAddCircle /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <IoSettings /> },
    {to:"/", label: "Log Out", icon: <GoSignOut /> }
  ];

  const linkClass = ({ isActive }) =>
    `text-lg md:text-xl font-semibold hover:text-blue-300 hover:text-amber-600 ${
      isActive ? 'text-blue-600' : 'text-black'
    }`;

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block fixed top-0 w-full px-2 py-2 backdrop-blur-sm bg-white/90 z-50 max">
        <div className="flex justify-around items-center w-full max-h-[63px]">
          <Link to="/dashboard">
            <img src={HomeIcon} alt="Home Icon" className="w-12 h-12" />
          </Link>

          <ul className="flex gap-x-6 items-center">
            {navItems.map((item) => (
              <NavLink clas key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Top Bar (always visible on mobile) */}
      <div className="md:hidden fixed top-0 left-0 w-full px-3 py-3 bg-blue/90 backdrop-blur-sm z-50 flex items-center justify-between">
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
          <img src={HomeIcon} alt="Home Icon" className="w-10 h-10" />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="p-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <FaToggleOff className="w-7 h-7 text-black" />
          ) : (
            <FaToggleOn className="w-7 h-7 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Drawer + Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-2/3 max-w-xs bg-white/95 backdrop-blur-sm p-4 pt-20 transition-transform duration-200 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <ul className="flex flex-col gap-y-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                {
                  <>
                    <div className='flex gap-x-2'>
                      <button className='text-blue-800 w-5 h-5 mt-1'>{item.icon}</button>
                      <p className='text-lg font-semibold text-gray-950 hover:font-bold'>{item.label}</p>
                    </div>
                  </>
                }
              </NavLink>
            ))}
          </ul>
        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-[64px] md:h-[72px]" />
    </>
  );
};

export default MainNavbar;
