def greatest_common_divider(a: int, b: int) -> int:
    if b > a:
        a, b = b, a

    remainder: int = a % b

    if remainder == 0:
        return b
    return greatest_common_divider(b, remainder)


def find_minimum_in_list(arr: list[int], position: int, currentMin: int) -> int:
    if position >= len(arr):
        return currentMin
    if arr[position] < currentMin:
        return find_minimum_in_list(arr, position=position+1, currentMin=arr[position])
    return find_minimum_in_list(arr=arr, position=position+1, currentMin=currentMin)


if __name__ == "__main__":
    arr: list[int] = [4, 8, 5, 4, 3, 9, 7, 24, 6, 4, 6, 8, 2, 34, 47, 52]
    print(f'{find_minimum_in_list(arr=arr, position=0, currentMin=arr[0])}')

    # print(f'{greatest_common_divider(34, 17)=}')
    # print(f'{greatest_common_divider(69, 96)=}')
    # print(f'{greatest_common_divider(35, 17)=}')
    # print(f'{greatest_common_divider(23, 37)=}')
