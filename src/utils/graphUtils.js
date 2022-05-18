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
	).toFixed(0)

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

	for (let i in edges) {
		let edge = edges[i]
		if (edge.source === nodeId || edge.target === nodeId) {
			ids.push(edge.id)
		}
	}

	return ids
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

export { getDistance, getConnectionIds, updateDistances, getGraphOf }
