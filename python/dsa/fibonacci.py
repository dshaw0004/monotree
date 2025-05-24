def recursive_fibonacci_upto_digit(n: int, a: int = 0, b: int = 1) -> int:
    if b >= n:
        return b
    if a == 0:
        print(a, b, sep=', ', end=', ')
    c = b + a
    print(c, end=', ')
    return recursive_fibonacci_upto_digit(n, b, c)


if __name__ == "__main__":
    recursive_fibonacci_upto_digit(28)
