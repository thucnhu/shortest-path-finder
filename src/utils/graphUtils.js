/**
 * Gets the distance between two nodes
 * @param {Object} node1 the first node
 * @param {Object} node2 the second node
 * @returns the distance between the two nodes
 */
function getDistance(node1, node2) {
	let distance = Math.sqrt(
		Math.pow(node1.position.x - node2.position.x, 2) +
			Math.pow(node1.position.y - node2.position.y, 2)
	)

	const DISTANCE_FACTOR = 10
	// decrease the distance label for more human-friendly view
	distance = (distance / DISTANCE_FACTOR).toFixed(0)

	return distance.toString()
}

/**
 * Get the list of connections in the graph
 * @param {String} nodeId the node id
 * @param {Object} graph graph obj in React Flow format
 * @returns the list of connections of the graph
 */
function getConnectionIds(nodeId, graph) {
	let edges = graph.getEdges()
	let ids = []
	for (let edge of edges.values()) {
		if (edge.source === nodeId || edge.target === nodeId) {
			ids.push(edge.id)
		}
	}

	return ids
}

/**
 * Loop through the list of edges and get the edge between two given nodes
 * @param {Object} edges list of edges in React Flow format
 * @param {String} startNodeId the start node id
 * @param {String} endNodeId the end node id
 * @returns the edge between the two nodes
 */
function getEdgeBetweenNodes(edges, startNodeId, endNodeId) {
	for (let edge of edges.values()) {
		if (
			(edge.source === startNodeId && edge.target === endNodeId) ||
			(edge.source === endNodeId && edge.target === startNodeId)
		)
			return edge
	}

	return null
}

/**
 * Change the styling of the edge between two given nodes
 * @param {Object} edges list of edges in React Flow format
 * @param {String} targetNodeId the target node id
 * @param {String} sourceNodeId the source node id
 */
function changeEdgeStyle(edges, targetNodeId, sourceNodeId) {
	let edge = getEdgeBetweenNodes(edges, targetNodeId, sourceNodeId)
	edge.animated = true
	edge.style = { ...edge.style, stroke: '#198754' }
	edge.labelStyle = { ...edge.style, color: '#198754', fontWeight: '300' }
}

/**
 * Clear the styling of the edges
 * @param {function} setNodes function to set the nodes
 * @param {Object} edges the edges in React Flow format
 */
function clearStyle(setNodes, edges) {
	setNodes(nds =>
		nds.map(node => {
			node.style = {}
			return node
		})
	)

	for (let edge of edges) {
		edge.animated = false
		edge.style = {}
		edge.labelStyle = {}
	}
}

/**
 * Update the distances when a node is added or moved around
 * @param {String} nodeId the node id
 * @param {Object} graph graph obj in React Flow format
 * @param {function} setEdges function to set the edges
 * @param {function} applyEdgeChanges function to apply the changes to the edges
 */
function updateDistances(nodeId, graph, setEdges, applyEdgeChanges) {
	let edges = getConnectionIds(nodeId, graph)
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

/**
 * Get the graph that will be used for dijkstra's algorithm
 * @param {Object} listNodes list of nodes in React Flow format
 * @param {Object} listEdges list of edges in React Flow format
 * @returns the graph in adjacency list format
 */
function getGraphOf(listNodes, listEdges) {
	let graph = {}

	for (let i = 0; i < listNodes.length; i++) {
		graph[listNodes[i].id] = {}
	}

	for (let i = 0; i < listEdges.length; i++) {
		let edge = listEdges[i]
		graph[edge.source][edge.target] = parseInt(edge.label)
		graph[edge.target][edge.source] = parseInt(edge.label)
	}

	return graph
}

function getAvailableNodeId(nodes) {
	let idSet = new Set()
	let newId = 1

	nodes.forEach(v => {
		idSet.add(parseInt(v.id))
	})

	while (true) {
		if (idSet.has(newId)) newId++
		else break
	}

	return newId.toString()
}

export {
	getDistance,
	getConnectionIds,
	getEdgeBetweenNodes,
	changeEdgeStyle,
	updateDistances,
	getGraphOf,
	clearStyle,
	getAvailableNodeId,
}
