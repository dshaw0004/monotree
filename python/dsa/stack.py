'''
Implementation of stack Data Structure in python from scratch.
'''
class Node:
    def __init__(self, value, next_node) -> None:
        self.value = value
        self.next = next_node

class Stack:
    def __init__(self) -> None:
        self.size: int = 0
        self.top: Node | None = None

    def __len__(self) -> int:
        return self.size

    def __repr__(self) -> str:
        output = []
        head = self.top
        while head:
            output.append(str(head.value))
            head = head.next
        return ', '.join(output)

    def push(self, value):
        if not value:
            raise ValueError('Provide a value to add in the stack')
        new_top = Node(value=value, next_node=self.top)
        self.top = new_top
        self.size += 1

    def peek(self):
        if not self.top:
            raise ValueError('Stack is empty. Nothing to peek')
        return self.top.value

    def pop(self):
        if not self.top:
            return None
        popped_node = self.top
        self.top = popped_node.next
        self.size -= 1
        return popped_node.value

def main():
    stack = Stack()
    print(stack)
    print(len(stack))

    stack.push(1)
    print(len(stack))

    stack.push(2)
    print(stack.peek())

    stack.push(3)
    stack.push(4)
    stack.push(5)
    stack.push(6)

    print(stack)
    print(len(stack))

    print(stack.pop())
    print(stack)
    
    print(stack.pop())
    print(stack)

    print(stack.pop())
    print(stack)

    print(stack)

if __name__ == '__main__':
    main()
