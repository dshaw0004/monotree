class CircularQueue:
    def __init__(self, size) -> None:
        self.size = size
        self.queue = [None]*size
        self.front = -1
        self.rear = -1

    def enqueue(self, item):
        if (self.rear + 1) % self.size == self.front:
            print("queue is full")
            return
        if self.front == -1:
            self.front = 0
        self.rear = (self.rear + 1) % self.size
        self.queue[self.rear] = item
        print(f'Inserted {item}')

    def dequeue(self):
        if self.front == -1:
            print("queue is empty")
            return None
        item = self.queue[self.front]
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.size
        return item

    def display(self):
        if self.front == -1:
            print("Queue is empty")
        else:
            print("Circular Queue elements:")
            i = self.front
            while True:
                print(self.queue[i], end=" ")
                if i == self.rear:
                    break
                i = (i + 1) % self.size
            print()

if '__main__' == __name__:
    cq = CircularQueue(5)
    cq.enqueue(10)
    cq.enqueue(20)
    cq.enqueue(30)
    cq.display()
    cq.dequeue()
    cq.display()
