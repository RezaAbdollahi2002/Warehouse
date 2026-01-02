import { useState,useEffect } from "react";
import api from "../../../api";

const Recruiter = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    

  }
    
  return (
    <div className='w-full mx-auto  '>
      {/* Header */}
      <div>
        <h2 className='text-2xl font-bold text-white text-center my-4'>Recruiter Information</h2>
      </div>
      {/* Content */}
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          handleSubmit(e);
        }>
          <label htmlFor="">First Name</label>
          <input type="text" />
          <label htmlFor="">Last Name</label>
          <input type="text" />
          <label htmlFor="">Email</label>
          <input type="email" />
          <label htmlFor="">Phone Number</label>
          <input type="tel" />
          <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded-md mt-4'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Recruiter
