from HalfAdder import Half_Adder
from LogicGates import AND, NOT, OR

__all__ = ['Full_Adder']

def Full_Adder(a: int, b: int, carry_in: int) -> tuple[int, int]:
    half_adder_sum, half_adder_carry = Half_Adder(a, b)
    full_adder_sum, _ = Half_Adder(half_adder_sum, carry_in)
    full_adder_carry = OR(
            half_adder_carry, 
            AND(
                half_adder_sum,
                carry_in
                )
            )

    return full_adder_sum, full_adder_carry
    
if __name__ == '__main__':
    a = int(input('Enter value for a: '))
    b = int(input('Enter value for b: '))
    carry_in = int(input('Enter previous sum carry value: '))
    SUM, carry = Full_Adder(a, b, carry_in)
    print(f'{SUM = } and {carry = }')
