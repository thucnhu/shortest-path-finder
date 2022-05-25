import React, { useState, useCallback, useEffect } from 'react'
import ReactFlow, { Controls, Background } from 'react-flow-renderer'
import {
	applyEdgeChanges, applyNodeChanges,
	addEdge,
	updateEdge
} from 'react-flow-renderer'
import { initialEdges, initialNodes } from '../constant/initialGraph'
import $ from 'jquery'
import Button from 'react-bootstrap/Button'

import { VisualizeTable, SummaryTable } from './'
import './GraphBoard.css'
import {
	getDistance,
	updateDistances,
	clearStyle
} from '../utils/graphUtils'

import { DELETE_KEY_CODES } from '../constant/graphConfig'
import { ConfirmDialog } from './Dialogs'


export default function GraphBoard() {
	const [nodes, setNodes] = useState(
		JSON.parse(localStorage.getItem('nodes')) || initialNodes
	)
	const [edges, setEdges] = useState(
		JSON.parse(localStorage.getItem('edges')) || initialEdges
	)
	const [graph, setGraph] = useState(null)
	const [pressed, setPressed] = useState(false)

	const [clearDisabled, setClearDisabled] = useState(true)
	
	const [isOpen, setIsOpen] = useState(false)

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

	const onEdgeUpdate = (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els));

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

	// a node is clicked/selected
	const onNodeClick = (inNode) => {
		// console.log(inNode)
		// setNodes((nds) =>
    //   nds.map((node) => {
    //     if (node.id === inNode.id) {
    //       // it's important that you create a new object here
    //       // in order to notify react flow about the change
    //       // node.data = {
    //       //   ...node.data,
    //       //   label: inNode.data['label'],
    //       // };
		// 			node.style = { ...node.style, backgroundColor: '#eef'};
    //     }

    //     return node;
    //   })
    // );
	}

	const onClear = () => {
		clearStyle(setNodes, edges)
		setClearDisabled(true)
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
					onEdgeUpdate={onEdgeUpdate}
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

				<div className='flex flex-row justify-center my-3'>
					<Button variant='dark' onClick={() => setIsOpen(true)} className='mx-4'>
						Reset
					</Button>
				</div>
			</div>
			<div className='flex md:flex-col sm:flex-row justify-between md:h-5/6 sm:h-auto w-full md:w-fit'>
				<SummaryTable nodes={nodes} edges={edges} />
				<VisualizeTable nodes={nodes} edges={edges} 
					setNodes={setNodes}
					clearDisabled={clearDisabled}
					setClearDisabled={setClearDisabled}
					setClearStyle={onClear}
				/>
			</div>

			<ConfirmDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setNodes={setNodes}
				setEdges={setEdges}
				clearStyle={onClear}
			/>
		</div>
	)
}
