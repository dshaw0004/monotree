def find_equation_root(f):
    a, b = 1, 2

    TOL = 0.00001 # error tolerence
    nmax = 100 # max number of iteration
    n = 1
    c = (a + b)/2

    while n <= nmax:
        if f(c) == 0 or (b - a)/2 < TOL:
            break
        n = n+1
        if f(c) < 0:
            a = c
        else:
            b = c

    return round(c)


def find_square_root(c, TOL=0.00001):
    a, b = 0, max(1, c)
    while (b - a) > TOL:
        m = (a + b) / 2
        if m**2 == c:
            return m
        elif m**2 > c:
            b = m
        else:
            a = m
    return round((a + b) / 2, 4)

def main():
    # define the equation as a lambda function 
    f = lambda x: x**3 - x - 2
    root = find_equation_root(f)

    print(f'root of the equation is {root}')

    num = 314
    sq_rt = find_square_root(num)
    print(f'square root of {num} = {sq_rt}')

if __name__ == '__main__':
    main()
