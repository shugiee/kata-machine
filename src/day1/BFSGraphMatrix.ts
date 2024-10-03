export default function bfs(
    graph: WeightedAdjacencyMatrix, 
    source: number, 
    needle: number): number[] | null {
    const seen = graph[0].map(n => false);
    const prev = graph[0].map(n => -1);
    const queue = [source];

    seen[source] = true;

    // While queue.length, pop from queue, handle node, add children
    do {
        const curr = queue.shift() as number;
        if (curr === needle) {break;}
        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) {
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            queue.push(i);
        }

    } while (queue.length > 0);
    // If prev[needle] is -1, we didn't find a path to it
    // Else, back track path
    if (prev[needle] === -1) {
        console.log("=== prev", prev);
        return null;
    }
    const path: number[] = [];
    let curr = needle;
    while (prev[curr] !== -1) {
        path.push(curr);
        curr = prev[curr];
    }
    path.push(source);
    return path.reverse();
}
