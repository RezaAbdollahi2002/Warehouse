import React from 'react';
import HomePageNavbar from '../Home/HomePageNavbar';
import EntryGate from '../Home/EntryGate';
import Footer from '../Home/Footer';
import HomePageInfo from '../Home/HomePageInfo';

const HomePage = () => {
  return (
    <div className=" flex flex-col gap-y-auto min-h-screen w-full bg-[#111D24]">
      {/* Signin and signup */}
      <div className='pt-10 w-full flex justify-center items-center mx-auto '>
        <HomePageInfo />
      </div>
      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
