'''
Binary Coded Decimal
- convert Decimal to Binary
'''

__all__ = ['decimal_to_binary']

def decimal_to_binary(decimal: int) -> int:
    binary = 0
    i = 0
    while decimal:
        rem = decimal % 2
        binary += pow(10, i) * rem
        decimal = decimal // 2
        i += 1
    return binary

def binary_to_decimal(binary: int) -> int:
    decimal: int = 0
    i = 0
    while binary:
        current_bit: int = binary % 10
        decimal += pow(2, i) * current_bit
        binary = binary // 10
        i += 1

    return decimal

if __name__ == '__main__':
    # decimal = int(input('Enter a decimal number: '))
    # binary = decimal_to_binary(decimal)

    # print(f'{binary=}')

    binary = int(input('Enter a binary number: '))
    decimal = binary_to_decimal(binary)

    print(f'{decimal=}')
