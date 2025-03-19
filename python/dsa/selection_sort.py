import random

s = [int(random.random() * 100) for _ in range(1, 17)]

print(s)
for i in range(0, len(s)):
    min_index = i
    for j in range(i, len(s)):
        if s[j] < s[min_index]:
            min_index = j
    s[i], s[min_index] = s[min_index], s[i]

print(s)
