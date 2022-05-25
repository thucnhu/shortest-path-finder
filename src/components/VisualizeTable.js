import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import findShortestPath from '../algo/dijkstras'
import { getGraphOf, changeEdgeStyle } from '../utils/graphUtils'

export default function VisualizeTable({
	nodes,
	edges,
	setNodes,
	clearDisabled,
	setClearDisabled,
	setClearStyle,
}) {
	const [startVertex, setStartVertex] = useState('')
	const [endVertex, setEndVertex] = useState('')

	const visualize = () => {
		setClearStyle()
		const graphMap = getGraphOf(nodes, edges)
		const shortestPathId = findShortestPath(graphMap, startVertex, endVertex)
		console.log('shortest path:' + shortestPathId)

		if (shortestPathId !== null) {
			setClearDisabled(false)

			setNodes(nds =>
				nds.map(node => {
					if (shortestPathId.includes(node.id)) {
						// it's important that you create a new object here
						// in order to notify react flow about the change
						node.style = {
							...node.style,
							backgroundColor: '#198754',
							color: 'white',
						}
					}
					return node
				})
			)

			for (let i = 0; i < shortestPathId.length - 1; i++) {
				let targetNodeId = shortestPathId[i]
				let sourceNodeId = shortestPathId[i + 1]
				changeEdgeStyle(edges, targetNodeId, sourceNodeId)
			}
		}
	}

	return (
		<div className='bg-brand-grey w-56 h-64 rounded-md p-4 flex flex-col items-center justify-evenly lg:mb-14'>
			<h5 className='text-center'>Find shortest path</h5>
			<div className='flex flex-row justify-between items-center mb-2'>
				<label>From vertex:</label>
				<input
					type='number'
					value={startVertex}
					min={nodes ? '1' : '0'}
					max={nodes.length.toString()}
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
					max={nodes.length.toString()}
					className='w-10 bg-transparent border-b-2 border-black pl-2 focus:outline-none'
					onChange={e => setEndVertex(e.target.value)}
				/>
			</div>
			<div className='flex flex-row justify-around mx-6 w-100'>
				<Button
					variant='dark'
					onClick={setClearStyle}
					disabled={
						startVertex === '' || endVertex === '' || clearDisabled
					}
				>
					Clear
				</Button>
				<Button
					variant='success'
					onClick={visualize}
					disabled={startVertex === '' || endVertex === ''}
				>
					Visualize
				</Button>
			</div>
		</div>
	)
}
