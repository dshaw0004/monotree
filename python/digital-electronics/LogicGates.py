def AND(*args) -> int:
    return int(all([*args]))

def OR(*args) -> int:
    return int(any([*args]))

def NOT(n: int) -> int:
    return int(not n)
