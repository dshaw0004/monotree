from FullAdder import Full_Adder

def add_2_number(a: int, b: int) -> int:
    carry = 0
    output = 0
    i = 0
    while a or b:
        i += 1
        x = pow(10, i)
        current_bit_a = a % 10
        current_bit_b = b % 10
        s, carry = Full_Adder(a=current_bit_a, b=current_bit_b, carry_in=carry)
        a = a // 10
        b = b // 10
        output += pow(10, i - 1) * s
    if carry:
        output += pow(10, i)

    return output

if __name__ == "__main__":
    a = int(input('enter value of a: '))
    b = int(input('enter value of b: '))
    ans = add_2_number(a, b)
    print(f'{ans = }')
