from LogicGates import AND, NOT, OR


def Mux4to1(i0: int, i1: int, i2: int, i3: int, s0: int, s1: int) -> int:
    output = OR(
            AND(
                    i0,
                    NOT(s0),
                    NOT(s1)
                ),
            AND(
                    i1,
                    NOT(s1),
                    s0
                ),
            AND(
                    i2,
                    s1,
                    NOT(s0)
                ),
            AND(
                    i3,
                    s1,
                    s0
                ),
            )

    return output


if __name__ == '__main__':
    i0 = int(input('Enter value of i0: '))
    i1 = int(input('Enter value of i1: '))
    i2 = int(input('Enter value of i2: '))
    i3 = int(input('Enter value of i3: '))
    s0 = int(input('Enter value of s0: '))
    s1 = int(input('Enter value of s1: '))

    output = Mux4to1(i0, i1, i2, i3, s0, s1)

    print(f'Output of the multiplexer is {output}')
