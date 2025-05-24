

/*import React from 'react'
import { assets } from '../assets/assets'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const {openSignIn} =useClerk()
  const {user}=useUser()
  return (
    <div className='shadow py-4'>
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
            <img src={assets.logo} alt="" />
            {
              user
              ?<div>
                <Link to={'/applications'}>Applied Jobs</Link>
                <p>|</p>
                <p>Hi,{user.firstName+" "+user.lastName}</p>
                <UserButton />

              </div>
              :<div className='flex gap-4 text-base sm:text-xs md:text-sm lg:text-base'>
              <button className='text-gray-600'>Recuruiter Login</button>
              <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
              
            </div>
            }
     
        </div>
    </div>
  )
}
export default Navbar-------------------------------------------------------------------------------------------*/

import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link ,useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext'
  const Navbar = () => {
  const { openSignIn } = useClerk();
  const navigate = useNavigate()
  const { setShowRecruiterLogin }  = useContext(AppContext)
  const { isSignedIn, user } = useUser(); // `isSignedIn` helps check if the user is logged in

  if (typeof isSignedIn === 'undefined') {
    // Prevent rendering while Clerk is initializing
    return null;
  }
  
  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick= { () => navigate('/') }className='cursor-pointer' src={assets.logo} alt="Logo" />
        {isSignedIn ? (  
          <div className="flex items-center gap-3">
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user.firstName + ' ' + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
            <div className="flex gap-4 text-base sm:text-xs md:text-sm lg:text-base">
            <button onClick={e => setShowRecruiterLogin(true) }className="text-gray-600">Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
