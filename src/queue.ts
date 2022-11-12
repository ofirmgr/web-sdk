export class Queue<T>{
  constructor(private maxItems: number=50) {}
  
  private data: { [index: number]: T } = Object.create(null);
  private nextEnqueueIndex = 0;
  private lastDequeuedIndex = 0;

  /** Enqueues the item in O(1) */
  enqueue(item: T): void {
    if(this.size() > this.maxItems) {
      this.dequeue();
    }
    this.data[this.nextEnqueueIndex] = item;
    this.nextEnqueueIndex++;
  }

  /**
   * Dequeues the first inserted item in O(1)
   * If there are no more items it returns `undefined`
   */
  dequeue(): T | undefined {
    if (this.lastDequeuedIndex !== this.nextEnqueueIndex) {
      const dequeued = this.data[this.lastDequeuedIndex];
      delete this.data[this.lastDequeuedIndex];
      this.lastDequeuedIndex++;
      return dequeued;
    }
  }
  /**
 * Returns the number of elements in the queue
  */
  size(): number {
    return this.nextEnqueueIndex - this.lastDequeuedIndex;
  }
  toArray(): T[] {
    const arr = [];
    for (let i = this.lastDequeuedIndex; i< this.nextEnqueueIndex ; i++) {
      arr.push(this.data[i]);
    }
    return arr;
  }
}