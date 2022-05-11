let nodeLabels = require('../constant/nodeLabels')

/**
 * A class that represents a graph using adjacency list
 */
class Graph {
	/**
	 * A graph is initialized with a single default node "A" and no edges
	 */
	constructor() {
		this.adjList = {
			A: [],
		}
	}

	/**
	 * Add a node to the graph
	 * @returns when an available node label is found
	 */
	addNode() {
		for (let i = 0; i < nodeLabels.length; i++) {
			if (!this.adjList[nodeLabels[i]]) {
				this.adjList[nodeLabels[i]] = []
				return
			}
		}
	}

	/**
	 * Add an edge between two nodes
	 * @param {Node} node1 the first node
	 * @param {Node} node2 the second node
	 * @param {int} weight the weight of the edge
	 */
	addEdge(node1, node2, weight) {
		this.adjList[node1].push({ node: node2, weight: weight })
		this.adjList[node2].push({ node: node1, weight: weight })
	}

	/**
	 * Remove an edge between two nodes
	 * @param {Node} node1 the first node
	 * @param {Node} node2 the second node
	 */
	removeEdge(node1, node2) {
		this.adjList[node1] = this.adjList[node1].filter(node => node !== node2)
		this.adjList[node2] = this.adjList[node2].filter(node => node !== node1)
	}

	/**
	 * Remove a node from the graph
	 * @param {Node} node the node to remove
	 */
	removeNode(node) {
		this.adjList[node].forEach(adjNode => {
			this.removeEdge(adjNode, node)
		})
		delete this.adjList[node]
	}

	/**
	 * Prints the graph
	 */
	printGraph() {
		console.log(this.adjList)
	}
}

module.exports = Graph
