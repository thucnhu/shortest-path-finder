const initialNodes = [
  {
    id: '1',
    // type: 'input',
    data: { label: 'A' },
    position: { x: 250, y: 25 },
  },
  
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>B</div> },
    position: { x: 100, y: 125 },
  },

  {
    id: '3',
    // type: 'output',
    data: { label: 'C' },
    position: { x: 250, y: 250 },
  },

  {
    id: '4',
    data: { label: 'D' },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
	{ id: 'e4-2', source: '4', target: '2' },
];

export {initialEdges, initialNodes}