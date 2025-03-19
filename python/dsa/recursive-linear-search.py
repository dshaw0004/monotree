def linear_search(arr: list[int], target: int, index: int = 0) -> int:
    if index == len(arr):
        return -1
    if target == arr[index]:
        return index
    return linear_search(arr=arr, target=target, index=index + 1)


n: int = int(input("Enter the size of array: "))
arr: list[int] = list()
for i in range(n):
    num: int = int(input(f"Enter a number for array index {i}: "))
    arr.append(num)
target: int = int(input("Enter the target value: "))
index: int = linear_search(arr=arr, target=target, index=0)

if index == -1:
    print("target element not found.")
else:
    print(f"target element found at index {index}")
