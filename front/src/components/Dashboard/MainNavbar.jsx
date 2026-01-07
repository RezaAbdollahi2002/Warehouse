import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '../../assets/HomeIcon.png';
import { useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { IoDocumentAttach } from 'react-icons/io5';
import { IoMdAddCircle } from 'react-icons/io';
import { MdFactory } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    const confirmLogOut = window.confirm('Are you sure you want to log out?');
    if (confirmLogOut) {
      localStorage.removeItem('token');
    }
  };


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
            <li>
              <Link to="/dashboard/documentations">Documentations</Link>
            </li>
            <li>
              <Link to="/dashboard/my_companies">My Companies</Link>
            </li>
            <li>
              <Link to="/dashboard/add_company">Add Company</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
            <li onClick={() => handleLogOut()}>
              <Link to="/">Log Out</Link>
            </li>
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
            <li className="flex justify-start items-center ">
              <IoDocumentAttach className="text-blue-500 mx-2" />
              <Link
                className={linkClass}
                to="/dashboard/my_companies"
                onClick={() => setIsOpen(false)}
              >
                Documentations
              </Link>
            </li>
            <li className="flex justify-start items-center ">
              <MdFactory className="text-blue-500 mx-2" />
              <Link
                className={linkClass}
                to="/dashboard/my_companies"
                onClick={() => setIsOpen(false)}
              >
                My Companies
              </Link>
            </li>
            <li className="flex justify-start items-center ">
              <IoMdAddCircle className="text-blue-500 mx-2" />
              <Link
                className={linkClass}
                to="/dashboard/add_company"
                onClick={() => setIsOpen(false)}
              >
                Add Company
              </Link>
            </li>
            <li className="flex justify-start items-center ">
              <IoSettings className="text-blue-500 mx-2" />
              <Link className={linkClass} to="/dashboard/settings" onClick={() => setIsOpen(false)}>
                Settings
              </Link>
            </li>
            <li onClick={() => handleLogOut()} className="flex justify-start items-center ">
              <GoSignOut className="text-blue-500 mx-2" />
              <Link className={linkClass} to="/" onClick={() => setIsOpen(false)}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed nav */}
      <div className="h-[64px] md:h-[72px]" />
    </>
  );
};

export default MainNavbar;
