from random import randint
from stack import Node, Stack


def main():
    stack: Stack = Stack()
    for _ in range(20):
        stack.push(randint(1, 30))

    print(f"The stack contains: {stack}")
    target: int = int(input("Enter a number to search in the stack"))
    index: int = 0
    head: Node | None = stack.top
    while head:
        if head.value == target:
            break
        head = head.next
        index += 1
    else:
        print(f"{target} is not available in the stack")
        return
    print(f"{target} is at the {index} index in the stack.")


if __name__ == "__main__":
    main()
