export const sanitazeRed = (red, redColor = undefined) => {
	const stationRed = red;
	const colorOfTheRed = redColor;

	const findStationByName = (name) => {
		function isStation(node) {
			return node.station === name;
		}
		return stationRed.find(isStation);
	};

	const getEdges = (inputStation) => {
		return findStationByName(inputStation).edges;
	};

	const isValidStation = (inputStation) => {
		const stationColor = findStationByName(inputStation).color;
		if (!stationColor || stationColor === colorOfTheRed) return true;
		return false;
	};

	const edgeHasBeenVisited = (edge, visitedArray) => {
		return visitedArray.includes(edge);
	};

	const getNewEdges = (station, visitedRecursionsArray, result) => {
		const stationEdges = getEdges(station);
		stationEdges.forEach((edge) => {
			if (isValidStation(edge)) {
				return result.push(edge);
			} else {
				if (edgeHasBeenVisited(edge, visitedRecursionsArray)) return;
				visitedRecursionsArray.push(edge);
				getNewEdges(edge, visitedRecursionsArray, result);
			}
		});
		return result;
	};

	const filterEdges = (station, edges) => {
		return Array.from(new Set(edges)).filter((edge) => edge !== station);
	};

	const processRed = () => {
		const newRed = {};
		let visited;
		let res;
		let stationName;
		stationRed.forEach((node) => {
			visited = [];
			res = [];
			stationName = node.station;
			if (isValidStation(stationName)) {
				const newEdges = getNewEdges(stationName, visited, res);
				newRed[stationName] = filterEdges(stationName, newEdges);
			}
		});
		return newRed;
	};

	const main = () => {
		if (!colorOfTheRed) {
			const result = {};
			stationRed.forEach((node) => {
				const { station, edges } = node;
				result[station] = edges;
			});
			return result;
		} else {
			return processRed();
		}
	};

	return main();
};
