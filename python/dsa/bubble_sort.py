import random

l = [int(random.random()*100) for _ in range(1, 17)]

print(f'before sorting => {l}')

for i in range(len(l)-1, 0, -1):
    for j in range(0, i):
        '''
        
        '''
        if l[i] > l[j]:
            l[len(l) - 1 - i], l[j] = l[j], l[len(l) - 1 - i]

print(f'after sorting => {l}')
