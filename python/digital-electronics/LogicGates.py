def AND(*args: int) -> int:
    return int(all([*args]))

def OR(*args: int) -> int:
    return int(any([*args]))

def NOT(n: int) -> int:
    return int(not n)

def XNOR(a: int, b: int) -> int:
    return OR(
            AND(a, b),
            AND(
                NOT(a),
                NOT(b)
                )
            )

def XOR(a: int, b: int) -> int:
    return OR(
            AND(
                a,
                NOT(b)
                ),
            AND(
                NOT(a),
                b
                )
            )
