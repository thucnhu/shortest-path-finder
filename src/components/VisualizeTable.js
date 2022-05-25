import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import findShortestPath from '../algo/dijkstras'
import { getGraphOf, changeEdgeStyle } from '../utils/graphUtils'
import {
	applyEdgeChanges, applyNodeChanges,
	addEdge,
	updateEdge
} from 'react-flow-renderer'

export default function VisualizeTable({nodes, edges, setNodes, setEdges}) {
	const [startVertex, setStartVertex] = useState('')
	const [endVertex, setEndVertex] = useState('')

	const visualize = () => {
		const graphMap = getGraphOf(nodes, edges)
		const shortestPathId = findShortestPath(graphMap, startVertex, endVertex)

		console.log("shortest path found:" + shortestPathId)

		setNodes((nds) =>

      nds.map((node) => {
        if (shortestPathId.includes(node.id)) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          // node.data = {
          //   ...node.data,
          //   label: inNode.data['label'],
          // };
					node.style = { ...node.style, backgroundColor: '#198754'};
        }

        return node;
      })
    );
		
		for (let i = 0; i < shortestPathId.length-1; i++) {
			let targetNodeId = shortestPathId[i]
			let sourceNodeId = shortestPathId[i+1]

			changeEdgeStyle(edges, targetNodeId, sourceNodeId)
		}
		
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
