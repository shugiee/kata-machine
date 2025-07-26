function sort_between_indices(arr: number[], start: number, end: number): void {
    if (end - start <= 1) {
        return;
    }
    const pivotIndex = Math.floor(start + (end - start)/2);

    // Move pivot to the end
    const pivotValue = arr[pivotIndex];
    arr[pivotIndex] = arr[end];
    arr[end] = pivotValue;

    let firstIndexLargerThanPivot = start;

    // Move any value smaller than pivot to the front
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            const tmp = arr[firstIndexLargerThanPivot];
            arr[firstIndexLargerThanPivot] = arr[i];
            arr[i] = tmp;
            firstIndexLargerThanPivot++;
        }
    }

    // Move pivot value back to middle of smaller and larger subarrays
    arr[end] = arr[firstIndexLargerThanPivot];
    arr[firstIndexLargerThanPivot] = pivotValue;

    // Recurse
    sort_between_indices(arr, start, firstIndexLargerThanPivot);
    sort_between_indices(arr, firstIndexLargerThanPivot, end);
}


export default function quick_sort(arr: number[]): void {
    sort_between_indices(arr, 0, arr.length - 1);
}
