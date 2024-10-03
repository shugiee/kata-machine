function walk(
    graph: WeightedAdjacencyList, 
    curr: number, 
    needle: number, 
    seen: boolean[], 
    path: number[]): boolean {

    if (seen[curr]) {
        return false;
    }

    seen[curr] = true;
    path.push(curr);

    if (curr === needle) {
        return true;
    }

    for (const adj of graph[curr]) {
        const hasFoundNeedle = walk(graph, adj.to, needle, seen, path);
        if (hasFoundNeedle) {
            return true;
        }
    }

    path.pop();
    return false;
}
export default function dfs(
    graph: WeightedAdjacencyList, 
    source: number, 
    needle: number): number[] | null {
    const seen: boolean[] = [];
    const path: number[] = [];
    walk(graph, source, needle, seen, path);
    if (path.length === 0) {
        return null;
    }
    return path;
}
