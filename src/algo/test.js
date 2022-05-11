var Graph = require('./Graph')

let graph = new Graph()

graph.addNode()
graph.addNode()
graph.addEdge('A', 'B', 1)
graph.addEdge('B', 'C', 1)
graph.printGraph()
