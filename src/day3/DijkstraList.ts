function hasUnvisitedNodes(visitedNodes: boolean[], dists: number[]) {
    return visitedNodes.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisitedNode(visitedNodes: boolean[], dists: number[]) {
    let lowestIndex = -1;
    let lowestDist = Infinity;

    for (let i = 0; i < visitedNodes.length; i++) {
        if (visitedNodes[i] === false && dists[i] < lowestDist) {
            lowestDist = dists[i];
            lowestIndex = i;
        }
    }

    return lowestIndex;
}

export default function dijkstra_list(
    source: number, 
    sink: number, 
    arr: WeightedAdjacencyList): number[] {
        const visitedNodes = new Array(arr.length).fill(false);
        const dists = new Array(arr.length).fill(Infinity);
        const prev = new Array(arr.length).fill(-1);
        dists[source] = 0;

        while (hasUnvisitedNodes(visitedNodes, dists)) {
            const currNode = getLowestUnvisitedNode(visitedNodes, dists);
            if (currNode === -1) {
                throw new Error("Couldn't find a lowest unvisited node!");
            }
            visitedNodes[currNode] = true;
            if (currNode === sink) {
                break;
            }

            for (const edge of arr[currNode]) {
                const newDist = dists[currNode] + edge.weight;
                if (newDist < dists[edge.to]) {
                    dists[edge.to] = newDist;
                    prev[edge.to] = currNode;
                }

            }
        }

        if (dists[sink] === -1) {
            return [];
        }

        const path: number[] = [];
        let curr = sink;

        while (curr !== source) {
            path.push(curr);
            curr = prev[curr];
        }
        path.push(source);

        return path.reverse();
    }
