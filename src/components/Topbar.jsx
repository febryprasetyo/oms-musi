import React from 'react';
import Logo from '../assets/logo-fastpec.png';
// import Moment from 'react-moment';

export default function TopBar() {
  return (
    <>
      <div className='bg-blue-bar'>
        <div className='relative flex h-16 items-center justify-center'>
          <img
            className='hidden h-8 w-auto lg:block'
            src={Logo}
            alt='Your Company'
          />
        </div>
      </div>
    </>
  );
}
