import exampleRed from './src/red.js';
import { sanitazeRed } from './src/utils/utils.js';
import WeightedGraph from './src/data_structures/WeightedGraph.js';

// function calculateShortesPath receives a red, initial and final station name & a train color
// and calculates the shortest path

// red: Array of objects [described on src/red.js]
// initialStation: string
// finalStation: string
// color: string [optional]

const calculateShortesPath = (
	red,
	initialStation,
	finalStation,
	color = undefined
) => {
	const graph = new WeightedGraph();
	const sanitazedRed = sanitazeRed(red, color);
	graph.createGraph(sanitazedRed);
	return graph.Dijkstra(initialStation, finalStation);
};

// Example
console.log(calculateShortesPath(exampleRed, 'A', 'F', 'red'));
