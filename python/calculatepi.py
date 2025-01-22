import math

def calculate_PI_nilkanthas_series(no_of_inter:int) -> float:
    '''
    pi = 3 + 4/(2*3*4)-4/(4*5*6)+4/(6*7*8) ...
    '''
    PI = 3
    n = 2
    for i in range(no_of_inter):
        PI += ((-1)**i)*(4/(n * (n+1) * (n+2)))
        n += 2

    return PI

def calculate_PI_gregory_leibniz_series(no_of_inter: int) -> float:
    PI = 0

    for i in range(no_of_inter):
        PI += (((-1)**i)*(4 / (2 * i + 1)))
    return PI

no_of_inter = 100_000_000

print(f'{calculate_PI_nilkanthas_series(no_of_inter)= }')
print(f'{calculate_PI_gregory_leibniz_series(no_of_inter)= }')
print(f'{math.pi = }')
