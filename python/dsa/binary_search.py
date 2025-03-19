import random

l = [int(random.random()*100) for _ in range(0, 20)]

print(f'We have a list with these values {l}')

sorted_l = sorted(l)

value = int(input('enter a number to search in the list: '))

while True:
    if value > sorted_l[-1] or value < sorted_l[0]:
        print(f'This list does not contain the value {value}')
        break
    if sorted_l[int(len(sorted_l)/2)] == value:
        print(f'This list contain the value {value}')
        break
    elif sorted_l[int(len(sorted_l)/2)] > value:
        sorted_l = sorted_l[:int(len(sorted_l)/2)]
    elif sorted_l[int(len(sorted_l)/2)] < value:
        sorted_l = sorted_l[int(len(sorted_l)/2):]
    else:
        print(f'This list does not contain the value {value}')
        break
