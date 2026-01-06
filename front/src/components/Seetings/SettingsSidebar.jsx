import { IoSettings } from 'react-icons/io5';
import { useState } from 'react';

const SettingsSidebar = (prom) => {
  return (
    <div className={` w-full top-0 lef-0 h-full  py-2  `}>
      <div className="flex flex-col justify-start items-start gap-y-3 w-full">
        <button className="text-blue-500" onClick={() => prom.setOpen(!prom.open)}>
          <IoSettings
            size={30}
            className={`inline ml-2 mb-1 mr-2 animate-none hover:text-gray-800 ${
              prom.open ? 'text-gray-500' : 'text-blue-500'
            }`}
          />
        </button>
        {prom.open && (
          <div className='w-full'>
            <hr className="text-gray-800 border-2 font-bold w-full" />
            <ul className="text-blue-500 flex flex-col gap-y-1 ml-2 w-full text-xs md:text-sm">
              <li
              onClick={() => prom.setChangeFirstNameOpen(!prom.changeFirstNameOpen)}
              className="hover:text-gray-800 pr-2 cursor-pointer hover:font-semibold">Change First Name</li>
              <hr className="font-bold border-2 w-full -ml-2" />
              <li
              onClick={() => prom.setChangeLastNameOpen(!prom.changeLastNameOpen)}
              className="hover:text-gray-800 pr-2 cursor-pointer hover:font-semibold">Change Last Name</li>
              <hr className="font-bold border-2 w-full -ml-2" />
               <li
              onClick={() => prom.setChangeDobOpen(!prom.changeDobOpen)}
              className="hover:text-gray-800 pr-2 cursor-pointer hover:font-semibold">Change Date Of Birth</li>
              <hr className="font-bold border-2 w-full -ml-2" />
               <li
              onClick={() => prom.setChangePhoneNumberOpen(!prom.changePhoneNumberOpen)}
              className="hover:text-gray-800 pr-2 cursor-pointer hover:font-semibold">Change Phone Number</li>
              <hr className="font-bold border-2 w-full -ml-2" />
              <li
              onClick={() => prom.setChangeAddressOpen(!prom.changeAddressOpen)}
              className="hover:text-gray-800 pr-2 cursor-pointer hover:font-semibold">Change Address</li>
              <hr className="font-bold border-2 w-full -ml-2" />
              <li
              onClick={() => prom.setChangePasswordOpen(!prom.changePasswordOpen)}
              className="hover:text-gray-800 pr-2 cursor-pointer hover:font-semibold">Change Password</li>
              <hr className="font-bold border-2 w-full -ml-2" />
              <li
              onClick={() => prom.setChangeEmailOpen(!prom.changeEmailOpen)}
              className="hover:text-gray-800 pr-2 cursor-pointer hover:font-semibold">Change Email</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsSidebar;
