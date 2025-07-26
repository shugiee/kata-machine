export default class MinHeap {
    private values: number[];

    constructor() {
        this.values = [];
    }
     
    get length(): number {
        return this.values.length;
    }

    insert(value: number): void {
        // console.log("About to insert", this.values);
        this.values.push(value);
        this.heapifyUp();
        // console.log("Done inserting", this.values);
    }

    delete(): number {
        console.log("About to delete", this.values);
        if (this.values.length === 0) {
            return -1;
        }

        const value = this.values[0];

        const largeValue = this.values.pop();
        if (largeValue === undefined) {
            return -1;
        }
        if (this.values.length === 0) {

            return value;
        }

        this.values[0] = largeValue;
        this.heapifyDown();

        console.log("Done deleting", this.values);
        return value;
    }

    private heapifyUp(): void {
        let currentIndex = this.values.length - 1;
        let parentIndex = this.getParent(currentIndex);

        while (this.values[currentIndex] < this.values[parentIndex]) {
            const tmp = this.values[currentIndex];
            this.values[currentIndex] = this.values[parentIndex];
            this.values[parentIndex] = tmp; 
            currentIndex = parentIndex;
            parentIndex = this.getParent(currentIndex);
        }
    }

    private heapifyDown(): void {
        let currentIndex = 0;
        let {left, right} = this.getChildren(currentIndex);
        let smallerChildIndex = (this.values[left] ?? Infinity) < (this.values[right] ?? Infinity) ? left: right;

        while (this.values[smallerChildIndex] < this.values[currentIndex]) {
            console.log("smaller child value,", this.values[smallerChildIndex], "is < than", this.values[currentIndex]);
            const tmp = this.values[currentIndex];
            this.values[currentIndex] = this.values[smallerChildIndex];
            this.values[smallerChildIndex] = tmp;

            currentIndex = smallerChildIndex;
            const newChildren = this.getChildren(currentIndex);
            left = newChildren.left;
            right = newChildren.right;
            smallerChildIndex = (this.values[left] ?? Infinity) < (this.values[right] ?? Infinity) ? left: right;
        }

    }

    private getParent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private getChildren(index: number): {left: number, right: number} {
        return {left: index * 2 + 1, right: index * 2 + 2};
    }
}
