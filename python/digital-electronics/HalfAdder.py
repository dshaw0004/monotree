from LogicGates import AND, NOT, OR

__all__ = ['Half_Adder']

def Half_Adder(a: int, b: int) -> tuple[int, int]:
    carry = AND(a, b)
    SUM: int = OR(
            AND(
                a, 
                NOT(b)
                ), 
            AND(
                NOT(a), 
                b
                )
            )
    return SUM, carry


if __name__ == '__main__':
    a = int(input('Enter value for a: '))
    b = int(input('Enter value for b: '))
    SUM, carry = Half_Adder(a, b)
    print(f'{SUM = } and {carry = }')
