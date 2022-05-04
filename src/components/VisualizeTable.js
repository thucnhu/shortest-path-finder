import React, { useState } from 'react'

export default function VisualizeTable() {
	const [startVertex, setStartVertex] = useState('')
	const [endVertex, setEndVertex] = useState('')
	const [isInvalid, setIsInvalid] = useState(false)

	return (
		<div className='bg-brand-grey w-56 h-64 rounded-md mb-6 p-5 flex flex-col items-center justify-evenly'>
			<h3 className='text-center'>Find shortest path</h3>
			<div className='w-full'>
				<div className='flex flex-row justify-between items-center mb-2'>
					<label>From vertex:</label>
					<input
						type='number'
						value={startVertex}
						min='1'
						className='w-10 bg-transparent border-b-2 border-black pl-2 focus:outline-none'
						onChange={e => setStartVertex(e.target.value)}
					/>
				</div>
				<div className='flex flex-row justify-between items-center mb-2'>
					<label>To vertex:</label>
					<input
						type='number'
						value={endVertex}
						min='1'
						className='w-10 bg-transparent border-b-2 border-black pl-2 focus:outline-none'
						onChange={e => setEndVertex(e.target.value)}
					/>
				</div>
				{isInvalid && <p className='text-red-600 mb-2'>Invalid vertex!</p>}
			</div>
			<button className='btn-green mx-auto'>Visualize</button>
		</div>
	)
}
