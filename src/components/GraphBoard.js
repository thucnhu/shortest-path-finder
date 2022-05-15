import React, { useState, useCallback, useEffect } from 'react'
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
import {
	getDistance,
	getConnectionIds,
	updateDistances,
} from '../utils/graphUtils'

export default function GraphBoard() {
	const [nodes, setNodes] = useState(
		JSON.parse(localStorage.getItem('nodes')) || initialNodes
	)
	const [edges, setEdges] = useState(
		JSON.parse(localStorage.getItem('edges')) || initialEdges
	)
	const [graph, setGraph] = useState(null)
	const [pressed, setPressed] = useState(false)

	const [removeDisabled, setRemoveDisabled] = useState(true)
	const [clearDisabled, setClearDisabled] = useState(true)
	// Cache nodes and edges into local storage
	useEffect(() => {
		localStorage.setItem('nodes', JSON.stringify(nodes))
		localStorage.setItem('edges', JSON.stringify(edges))
	}, [nodes, edges])

	// Retrieve graph from local storage and set it to the current state of graph
	useEffect(() => {
		const currNodes = JSON.parse(localStorage.getItem('nodes'))
		const currEdges = JSON.parse(localStorage.getItem('edges'))

		if (currNodes && currEdges) {
			setNodes(nds => applyNodeChanges(currNodes, nds))
			setEdges(nds => applyEdgeChanges(currEdges, nds))
		}
	}, [])

	const onNodesChange = useCallback(
		changes => {
			updateDistances(changes[0].id, graph, setEdges, applyEdgeChanges)
			setNodes(nds => applyNodeChanges(changes, nds))
		},
		[graph, setNodes]
	)

	const onEdgesChange = useCallback(
		changes => setEdges(eds => applyEdgeChanges(changes, eds)),
		[setEdges]
	)

	const onConnect = useCallback(
		connection => {
			let node1 = graph.getNode(connection.source)
			let node2 = graph.getNode(connection.target)
			connection['label'] = getDistance(node1, node2)
			setEdges(eds => addEdge(connection, eds))
		},
		[graph, setEdges]
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
		let edges = getConnectionIds('1', graph)
		let changedEdges = []

		for (let id in edges) {
			let edge = graph.getEdge(edges[id])
			let node1 = graph.getNode(edge.source)
			let node2 = graph.getNode(edge.target)
			edge['label'] = getDistance(node1, node2)

			changedEdges.push(edge)
		}

		setEdges(eds => applyEdgeChanges(changedEdges, eds))
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

			<div className='flex flex-row justify-center my-3'>
				<Button variant='dark' disabled={removeDisabled} className='mx-4'>
					Remove
				</Button>
				<Button variant='dark' disabled={clearDisabled} className='mx-4'>
					Clear
				</Button>
			</div>
		</div>
	)
}
