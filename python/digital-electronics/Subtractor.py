from LogicGates import OR, XOR, NOT, AND

def Half_Subtractor(a: int, b: int) -> tuple[int, int]:
    difference: int = XOR(a, b)
    borrow: int = AND(
                    NOT(a),
                    b
                    )

    return difference, borrow


def Full_Subtractor(a: int, b: int, borrow_in: int) -> tuple[int, int]:
    difference: int = XOR(
            borrow_in,
            XOR(a, b)
            )

    borrow: int = OR(
            AND(
                    NOT(a),
                    b
                    ),
                    AND(
                        borrow_in,
                        NOT(
                            XOR(a, b)
                            )
                        )
                )

    return difference, borrow


if __name__ == '__main__':
    difference, borrow = Half_Subtractor(1, 1)

    print(f'{difference = } and {borrow = }')
    difference, borrow = Half_Subtractor(0, 0)

    print(f'{difference = } and {borrow = }')
    difference, borrow = Half_Subtractor(1, 0)

    print(f'{difference = } and {borrow = }')
    difference, borrow = Half_Subtractor(0, 1)

    print(f'{difference = } and {borrow = }')

