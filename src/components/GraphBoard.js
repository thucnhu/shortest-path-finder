import React, { useState, useCallback } from 'react'
import ReactFlow, { Controls, Background } from 'react-flow-renderer'
import {
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
} from 'react-flow-renderer'
import { initialEdges, initialNodes } from '../constant/initialGraph'

import './GraphBoard.css'

export default function GraphBoard() {
	const [nodes, setNodes] = useState(initialNodes)
	const [edges, setEdges] = useState(initialEdges)

	const onNodesChange = useCallback(
		changes => setNodes(nds => applyNodeChanges(changes, nds)),
		[setNodes]
	)

	const onEdgesChange = useCallback(
		changes => setEdges(eds => applyEdgeChanges(changes, eds)),
		[setEdges]
	)

	const onConnect = useCallback(
		connection => setEdges(eds => addEdge(connection, eds)),
		[setEdges]
	)

	return (
		<div className='border-2 border-black h-full w-full rounded-md mx-auto'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Controls />
				<Background />
			</ReactFlow>
		</div>
	)
}
