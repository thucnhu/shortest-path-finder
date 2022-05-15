const initialNodes = [
	{
		// node 1 MUST be 0 0
		id: '1',
		// type: 'input',
		data: { label: '1' },
		position: { x: 0, y: 0 },
	},

	{
		id: '2',
		// you can also pass a React component as a label
		data: { label: '2' },
		position: { x: 100, y: 125 },
	},

	{
		id: '3',
		// type: 'output',
		data: { label: '3' },
		position: { x: 250, y: 250 },
	},

	{
		id: '4',
		data: { label: '4' },
		position: { x: 250, y: 25 },
	},
]

const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2', label: '20' },
	{ id: 'e2-3', source: '2', target: '3', label: '33' },
	{ id: 'e4-2', source: '4', target: '2', label: '40' },
]

export { initialEdges, initialNodes }
