import exampleRed from './red.js';
import { sanitazeRed } from './utils/utils.js';
import WeightedGraph from './data_structures/WeightedGraph.js';

// function calculateShortesPath receives a red, initial and final station name & a train color
// and calculates the shortest path

// red: Array of objects [described on red.js]
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
console.log(calculateShortesPath(exampleRed, 'A', 'F', 'green'));
