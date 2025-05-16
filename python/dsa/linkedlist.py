class Node:
    def __init__(self, data):
        self.data = data
        self.next_node = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        last = self.head
        while last.next_node:
            last = last.next_node
        last.next_node = new_node

    def reverse(self):
        prev = None
        current = self.head
        while current:
            next_node = current.next_node
            current.next_node = prev
            prev = current
            current = next_node
        self.head = prev

    def delete_middle(self, value):
        if self.head == None:
            print('LinkedList is empty')
            return None

        current = self.head
        next_node = current.next_node
        prev = None

        while current:
            if current.data == value:
                if prev:
                    prev.next_node = next_node
                else:
                    self.head = next_node
                return current.data
            if next_node == None:
                break
            prev = current
            current = next_node
            next_node = next_node.next_node
        print(f"{value} not found in the LinkedList")
        return None

    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next_node
        print("None")

# Example usage:
ll = LinkedList()
while True:
    com = int(input('>>> '))
    if com == 1:
        ll.print_list()
    elif com == 2:
        d = input("enter data: ")
        ll.append(d)
    elif com == 3:
        ll.print_list()
        ll.reverse()
        ll.print_list()
    elif com == 4:
        v = input("enter value to delete: ")
        ll.delete_middle(v)
        ll.print_list()
    elif com == 5:
        break
