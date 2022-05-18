import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import findShortestPath from '../algo/dijkstras'
import { getGraphOf } from '../utils/graphUtils'

export default function VisualizeTable(nodes) {
	const [startVertex, setStartVertex] = useState('')
	const [endVertex, setEndVertex] = useState('')

	const visualize = () => {
		let graph = getGraphOf(nodes.nodes, nodes.edges)
		console.log(findShortestPath(graph, startVertex, endVertex))
		// TODO: visualize the path directly on the graph
	}

	return (
		<div className='bg-brand-grey w-56 h-64 rounded-md p-4 flex flex-col items-center justify-evenly'>
			<h5 className='text-center'>Find shortest path</h5>
			<div className='flex flex-row justify-between items-center mb-2'>
				<label>From vertex:</label>
				<input
					type='number'
					value={startVertex}
					min={nodes ? '1' : '0'}
					max={nodes.length}
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
			<Button
				variant='success'
				onClick={visualize}
				disabled={startVertex === '' || endVertex === ''}
			>
				Visualize
			</Button>
		</div>
	)
}
