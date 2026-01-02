import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Logo from "../../assets/HomeIcon.png"

const HomePageInfo = () => {
  return (
    <div className="w-full text-center">
      <div className="bg-[#071324] w-full bg-opacity-50 px-6 py-10 rounded-md flex justify-around items-center gap-x-3 ">
        <div className='w-[40%] items-center '>
            <img src={Logo} alt="Home" className='w-90 h-60 text-white rounded-sm bg-transparent mx-auto'/>
        </div>
        <div className='w-[60%]'>
          <h1 className="text-4xl font-bold text-white mb-4">
            <Typewriter
              words={['Welcome to Warehouse Management System']}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
            />
          </h1>
          <p className="text-xl text-gray-300">
            Efficiently manage your job seeking with our advanced system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageInfo;
