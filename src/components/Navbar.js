import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='h-10 z-10 w-screen sticky top-0 bg-brand-green flex flex-row justify-between items-center px-xl text-white font-bold'>
      <Link to='/' className='hover:text-gray-100 cursor-pointer'>Shortest path finder</Link>
      <Link to='/about'>About</Link>
    </nav>
    );
}