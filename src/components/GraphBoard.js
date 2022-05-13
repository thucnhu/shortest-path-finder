import React, { useState, useCallback } from 'react'
import ReactFlow, { Controls, Background } from 'react-flow-renderer'
import {
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
} from 'react-flow-renderer'
import { initialEdges, initialNodes } from '../constant/initialGraph'
import $ from 'jquery'
import Button from 'react-bootstrap/Button'

import './GraphBoard.css'

export default function GraphBoard() {
	const [nodes, setNodes] = useState(initialNodes)
	const [edges, setEdges] = useState(initialEdges)
	const [graph, setGraph] = useState(null)
	const [pressed, setPressed] = useState(false)

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

	const onGraphInit = instance => {
		setGraph(instance)
	}

	const getZoomFactor = () => {
		let node1 = $('#graph').find('[data-id="1"]')[0].getBoundingClientRect()
		let node2 = $('#graph').find('[data-id="2"]')[0].getBoundingClientRect()

		let nodeG1 = graph.getNode('1')
		let nodeG2 = graph.getNode('2')

		return (node1.x - node2.x) / (nodeG1.position.x - nodeG2.position.x)
	}

	const onBoardClick = e => {
		if (!pressed) {
			let zoomFactor = getZoomFactor()

			let baseNodeDom = $('#graph').find('[data-id="1"]')[0]
			let baseNodeRect = baseNodeDom.getBoundingClientRect()

			let nodeScreenX = baseNodeRect.x + baseNodeRect.width / 2
			let nodeScreenY = baseNodeRect.y + baseNodeRect.height / 2

			let newX = (e.clientX - nodeScreenX) / zoomFactor
			let newY = (e.clientY - nodeScreenY) / zoomFactor
			let newId = (graph.getNodes().length + 1).toString()

			graph.addNodes({
				id: newId,
				data: { label: newId },
				position: { x: newX, y: newY },
			})
		}

		// reset add node listener
		setPressed(false)
	}

	// hanlde mouse drag -> dont add node
	const onBoardMouseDown = () => {
		setPressed(true)
	}

	const test = () => {
		graph.addNodes({
			id: (graph.getNodes().length + 1).toString(),
			data: { label: <div>E</div> },
			position: { x: 0, y: 125 },
		})
		graph.addEdges({ id: 'e5-2', source: '5', target: '2', label: '45' })
	}

	return (
		<div className='border-2 border-black h-full w-full rounded-md mx-auto'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				onInit={instance => onGraphInit(instance)}
				fitView
				onMouseDown={onBoardMouseDown}
				onClick={onBoardClick}
				id='graph'
			>
				<Controls />
				<Background />
			</ReactFlow>

			<Button onClick={test}>Test</Button>
		</div>
	)
}
