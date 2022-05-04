import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<nav className='h-10 z-10 w-full sticky top-0 bg-brand-green flex flex-row justify-between items-center text-white font-bold px-56'>
			<Link to='/' className='hover:text-gray-100 cursor-pointer transition'>
				Shortest path finder
			</Link>
			<Link
				to='/about'
				className='hover:text-gray-100 cursor-pointer transition'
			>
				About
			</Link>
		</nav>
	)
}
