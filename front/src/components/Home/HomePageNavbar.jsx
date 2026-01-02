import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../../assets/HomeIcon.png';

const HomePageNavbar = () => {
  return (
    <div className="fixed top-0 z-50 px-1.5 py-1 text-lg   text-white backdrop-blur-sm bg-white/90  w-full flex justify-around max-h-[63px] ">
      <div>
        <ul>
          <Link to={'/'}>
            <img src={HomeIcon} alt="HomeIcon" className="w-12 h-12.5 bg-transparent" />
          </Link>
          
        </ul>
      </div>
      <div className=' my-auto space-x-4'>
        <Link to={"/entrygate"} className='font-semibold text-black hover:text-blue-800'>
          Signin
        </Link>
        <Link to={"/about"} className='font-semibold text-black hover:text-blue-800'>
          About
        </Link>
      </div>
    </div>
  );
};

export default HomePageNavbar;
