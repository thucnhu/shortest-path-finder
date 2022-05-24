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

import { VisualizeTable, SummaryTable } from './'
import './GraphBoard.css'
import { getDistance, updateDistances } from '../utils/graphUtils'

import { DELETE_KEY_CODES } from '../constant/graphConfig'

export default function GraphBoard() {
	const [nodes, setNodes] = useState(
		JSON.parse(localStorage.getItem('nodes')) || initialNodes
	)
	const [edges, setEdges] = useState(
		JSON.parse(localStorage.getItem('edges')) || initialEdges
	)
	const [graph, setGraph] = useState(null)
	const [pressed, setPressed] = useState(false)

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

	const clearBtnClick = () => {
		setNodes(initialNodes)
		setEdges(initialEdges)
	}

	// a node is clicked/selected
	const onNodeClick = node => {
		// console.log(node)
		// console.log('clicked')
	}

	return (
		<div
			className='w-full flex md:flex-row flex-col justify-between items-center'
			style={{ height: '90vh', minHeight: '600px' }}
		>
			<div className='border-2 border-black rounded-md mx-auto md:w-4/5 w-11/12 h-5/6 justify-center'>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onInit={instance => onGraphInit(instance)}
					onNodeClick={(event, node) => onNodeClick(node)}
					onMouseDown={onBoardMouseDown}
					onClick={onBoardClick}
					deleteKeyCode={DELETE_KEY_CODES}
					connectionMode={'loose'}
					fitView
					id='graph'
				>
					<Controls />
					<Background />
				</ReactFlow>

				<div className='flex justify-center my-3'>
					<Button variant='dark' onClick={clearBtnClick}>
						Clear
					</Button>
				</div>
			</div>
			<div className='flex md:flex-col sm:flex-row justify-between md:h-5/6 sm:h-auto w-full md:w-fit'>
				<SummaryTable nodes={nodes} edges={edges} />
				<VisualizeTable nodes={nodes} edges={edges} />
			</div>
		</div>
	)
}
