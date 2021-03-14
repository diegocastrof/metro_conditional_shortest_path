export const sanitazeRed = (red, color = undefined) => {
	const notSameColorStations = {};
	const stationsToRemove = [];
	const result = {};

	if (!color) {
		red.forEach((node) => {
			const { station, edges } = node;
			result[station] = edges;
		});
		return result;
	}

	// Gets info from Nodes to remove
	red.forEach((node) => {
		const stationColor = node.color;
		if (stationColor && stationColor !== color) {
			notSameColorStations[node.station] = node.edges;
			stationsToRemove.push(node.station);
		}
	});
	// Removes nodes that doest not match train color
	const sanitazeRed = red.filter(
		(node) => !stationsToRemove.includes(node.station)
	);
	// Update edges considering the nodes removed
	sanitazeRed.forEach((node) => {
		const { station, edges } = node;
		let updatedEdges = [];
		for (let key in notSameColorStations) {
			if (edges.includes(key)) {
				updatedEdges = new Set([
					...edges,
					...updatedEdges,
					...notSameColorStations[key],
				]);
				updatedEdges = Array.from(updatedEdges);
				updatedEdges = updatedEdges.filter(
					(edge) => !stationsToRemove.includes(edge) && edge !== station
				);
			} else {
				updatedEdges = [...edges];
			}
		}
		result[station] = updatedEdges;
	});
	return result;
};
