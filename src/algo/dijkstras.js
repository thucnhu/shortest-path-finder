/**
 * 1. Mark all nodes as unvisited
	2. Assign to all nodes a tentative distance value
	3. For the current node, calculate the distance to all unvisited neighbors
	3.1. Update shortest distance if the new distance is less than the old distance
	4. Mark the current node as visited
	5. Choose new current node from unvisited nodes with minimal distance
 * @param {Graph} graph the given graph
 * @param {int} startNode the starting node
 * @param {int} endNode the ending node
 * @returns {Array} the shortest path between the two nodes
 */
function findShortestPath(graph, startNode, endNode) {
	let distances = {} // track distances from startNode to all other nodes

	// Assign to all nodes a tentative distance value
	for (let node in graph) {
		if (node === startNode) distances[node] = 0
		else distances[node] = Infinity
	}

	let visited = [] // track the visited nodes
	let previous = {} // track the previous node for each node
	let currNode = startNode

	while (visited.length < Object.keys(graph).length) {
		// update distances to all unvisited neighbors
		for (let neighbor in graph[currNode]) {
			let distance = distances[currNode] + graph[currNode][neighbor]

			if (distance < distances[neighbor]) {
				distances[neighbor] = distance
				previous[neighbor] = currNode
			}
		}

		visited.push(currNode) // mark the current node as visited
		currNode = getMinDistance(distances, visited) // choose new current node from unvisited nodes with minimal distance
	}

	// build the shortest path
	let path = [endNode]
	while (path[0] !== startNode) {
		path.unshift(previous[path[0]])
	}

	return path
}

/**
 * Get the node with the minimum distance from the unvisited nodes
 * @param {Object} distances the distances from startNode to all other nodes
 * @param {Array} visited the visited nodes
 * @returns the node with the minimal distance
 */
function getMinDistance(distances, visited) {
	let minDistance = Infinity
	let minDistanceNode = null

	for (let node in distances) {
		if (distances[node] < minDistance && !visited.includes(node)) {
			minDistance = distances[node]
			minDistanceNode = node
		}
	}

	return minDistanceNode
}

// let graph = {
// 	A: { B: 7, C: 8 },
// 	B: { A: 7, C: 2, D: 2 },
// 	C: { A: 8, B: 2, D: 6, E: 5 },
// 	D: { B: 2, C: 6, E: 3 },
// 	E: { C: 5, D: 3 },
// }

// console.log(findShortestPath(graph, 'A', 'E'))

module.exports = findShortestPath
