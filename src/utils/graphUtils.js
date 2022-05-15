function getDistance(node1, node2) {
	let distance = Math.sqrt(
		Math.pow(node1.position.x - node2.position.x, 2) +
			Math.pow(node1.position.y - node2.position.y, 2)
	).toFixed(0)

	return distance.toString()
}

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

export { getDistance, getConnectionIds, updateDistances }
