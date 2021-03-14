import PriorityQueue from './PriorityQueue.js';

class WeightedGraph {
	constructor() {
		this.adjacencyList = {};
	}
	createGraph(processedRed) {
		for (let key in processedRed) {
			let edges = [];
			processedRed[key].forEach((elem) => {
				edges.push({ node: elem, weight: 1 });
			});
			this.adjacencyList[key] = edges;
		}
	}
	Dijkstra(start, finish) {
		const nodes = new PriorityQueue();
		const distances = {};
		const previous = {};
		let path = []; //to return at end
		let smallest;
		//build up initial state
		for (let vertex in this.adjacencyList) {
			if (vertex === start) {
				distances[vertex] = 0;
				nodes.enqueue(vertex, 0);
			} else {
				distances[vertex] = Infinity;
				nodes.enqueue(vertex, Infinity);
			}
			previous[vertex] = null;
		}
		// as long as there is something to visit
		while (nodes.values.length) {
			smallest = nodes.dequeue().val;
			if (smallest === finish) {
				//WE ARE DONE
				//BUILD UP PATH TO RETURN AT END
				while (previous[smallest]) {
					path.push(smallest);
					smallest = previous[smallest];
				}
				break;
			}
			if (smallest || distances[smallest] !== Infinity) {
				for (let neighbor in this.adjacencyList[smallest]) {
					//find neighboring node
					let nextNode = this.adjacencyList[smallest][neighbor];
					//calculate new distance to neighboring node
					let candidate = distances[smallest] + nextNode.weight;
					let nextNeighbor = nextNode.node;
					if (candidate < distances[nextNeighbor]) {
						//updating new smallest distance to neighbor
						distances[nextNeighbor] = candidate;
						//updating previous - How we got to neighbor
						previous[nextNeighbor] = smallest;
						//enqueue in priority queue with new priority
						nodes.enqueue(nextNeighbor, candidate);
					}
				}
			}
		}
		return path.concat(smallest).reverse();
	}
}

export default WeightedGraph;
