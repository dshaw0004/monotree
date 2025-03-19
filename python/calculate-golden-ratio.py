def golden_ratio(no_of_iter:int) -> float:
    a, b = 0, 1
    for _ in range(2, no_of_iter+1):
        a, b = b, a+b
    return b/a

print(golden_ratio(15))
print(golden_ratio(25))
print(golden_ratio(50))
print(golden_ratio(100))
print(golden_ratio(200))
print(golden_ratio(300))

