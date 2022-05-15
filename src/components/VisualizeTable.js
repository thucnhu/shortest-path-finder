import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function VisualizeTable(graph) {
	const [startVertex, setStartVertex] = useState('')
	const [endVertex, setEndVertex] = useState('')
	const [isInvalid, setIsInvalid] = useState(false)


	const visualize = () => {
		console.log('clicked')
		console.log(JSON.parse(localStorage.getItem('nodes')))
		console.log(JSON.parse(localStorage.getItem('edges')))
	}

	return (
		<div className='bg-brand-grey w-56 h-64 rounded-md p-4 flex flex-col items-center justify-evenly'>
			<h5 className='text-center'>Find shortest path</h5>
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
			<Button variant='success' onClick={visualize}>Visualize</Button>
		</div>
	)
}
