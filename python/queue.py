"""
Implementation of Queue Data Structure in python from scratch.
"""


class Node:
    def __init__(self, value: str | int | float, next_node) -> None:
        self.value = value
        self.next = next_node


class Queue:
    def __init__(self) -> None:
        self.size: int = 0
        self.first: Node | None = None
        self.last: Node | None = None

    def __len__(self) -> int:
        return self.size

    def __repr__(self) -> str:
        output = []
        head = self.first
        while head:
            output.append(str(head.value))
            head = head.next
        return ", ".join(output)

    def add(self, value):
        if not value:
            raise ValueError("Provide a value to add in the queue")
        new_node = Node(value=value, next_node=None)
        self.size += 1
        if self.first is None or self.last is None:
            self.first = new_node
            self.last = new_node
            return
        self.last.next = new_node
        self.last = new_node

    def peek(self):
        if not self.first:
            raise ValueError("Queue is empty. Nothing to peek")
        return self.first.value

    def pop(self):
        if not self.first:
            return None
        popped_node = self.first
        self.first = popped_node.next
        self.size -= 1
        return popped_node.value


def main():
    queue = Queue()
    print(queue)
    print(len(queue))

    queue.add(1)
    print(len(queue))

    queue.add(2)
    print(queue.peek())

    queue.add(3)
    queue.add(4)
    queue.add(5)
    queue.add(6)

    print(queue)
    print(len(queue))

    print(queue.pop())
    print(queue)
    print(queue.pop())
    print(queue)

    print(queue.pop())
    print(queue)

    print(queue)


if __name__ == "__main__":
    main()
