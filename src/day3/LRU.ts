type Node<V> = {
    value: V;
    prev?: Node<V>;
    next?: Node<V>;
}

function createNode<V>(value: V): Node<V> {
    return {value};
}

export default class LRU<K, V> {
    private length: number;
    private head: Node<V> | undefined;
    private tail: Node<V> | undefined;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;
    private capacity: number;

    constructor(capacity: number) {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
        this.lookup = new Map();
        this.reverseLookup = new Map();
        this.capacity = capacity;
    }

    update(key: K, value: V): void {
        // Check if exists; return undefined if not
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.maybeTrim();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }


    }

    get(key: K): V | undefined {
        // Check if exists; return undefined if not
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        this.detach(node);
        this.prepend(node);

        return node.value;
    }
    
    private detach(node: Node<V>) {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.prev = undefined;
        node.next = undefined;
    }

    private prepend(node: Node<V>) {
        if (!this.head) {
            this.head = this.tail = node;
            return;
        } 

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    maybeTrim(): void {
        while (this.length > this.capacity) {
            // We should always have a tail if we have a nonzero length
            if (!this.tail) {
                throw new Error("No tail found but length is non-zero!");
            }
            const formerTail = this.tail;
            this.detach(formerTail);

            const key = this.reverseLookup.get(formerTail) as K;
            this.lookup.delete(key);
            this.reverseLookup.delete(formerTail);
            this.length--;
        }
    }
}
