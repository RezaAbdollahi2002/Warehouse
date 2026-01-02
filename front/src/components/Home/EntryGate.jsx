import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const EntryGate = () => {
  const [signin, setsigin] = useState(true);

  const handleSignin = (condition) => {
    if (condition === 'signin') {
      setsigin(true);
    } else {
      setsigin(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center mx-auto bg-[#071324] ">
      <div className="min-w-[600px] max-w-[800px] min-h-[300px] max-h-[400px] bg-white mx-auto my-auto  rounded-sm border-gray-600 shadow-sm shadow-white">
        {/* Buttons */}
        <div className='text-2xl border w-full text-center'>
          <button
            onClick={() => handleSignin('signin')}
            className={`${signin ? 'bg-blue-400 shadow-sm  px-2 py-2 text-white  font-bold w-[50%]' : 'bg-gray-400 shadow-sm  px-2 py-2 text-white font-bold w-[50%]'} `}
          >
            Signin
          </button>
          <button
            onClick={() => handleSignin('signup')}
            className={`${!signin ? 'bg-blue-400 shadow-sm  px-2 py-2 text-white font-bold w-[50%]' : 'bg-gray-400 shadow-sm  px-2 py-2 text-white font-bold w-[50%]'} `}
          >
            Signup
          </button>
        </div>
        <div>
          {
            signin ? (
              <>
                <Signin />
              </>
            ) : (
              <>
                <Signup setsigin={setsigin} />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default EntryGate;
