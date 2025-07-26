export default function two_crystal_balls(breaks: boolean[]): number {
    const d = Math.floor(Math.sqrt(breaks.length));
    let i = d;

    while (i < breaks.length && !breaks[i]) {
        i += d;
    }

    const start = i - d;

    for (let j = start; j < breaks.length; j++) {
        if (breaks[j]) {
            return j;
        }
    }

    return -1;
}
