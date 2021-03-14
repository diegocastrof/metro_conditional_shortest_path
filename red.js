const exampleRed = [
	{ station: 'A', edges: ['B'] },
	{ station: 'B', edges: ['A', 'C'] },
	{ station: 'C', edges: ['B', 'D', 'G'] },
	{ station: 'D', edges: ['C', 'E'] },
	{ station: 'E', edges: ['D', 'F'] },
	{ station: 'F', edges: ['E', 'I'] },
	{ station: 'I', edges: ['F', 'H'], color: 'green' },
	{ station: 'H', edges: ['G', 'I'], color: 'red' },
	{ station: 'G', edges: ['H', 'C'], color: 'green' },
];

export default exampleRed;
