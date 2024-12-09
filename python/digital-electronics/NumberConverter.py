'''
Converts number from one number system to other.
- convert Decimal to Binary
- convert Binary to Decimal
'''



def decimal_to_hex(decimal: int) -> str:
    hex_value = ''
    i = 0
    values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    while decimal:
        rem = decimal % 16
        hex_value += str(values[rem])
        decimal = decimal // 16
    return hex_value[::-1]

def hex_to_decimal(hexa_decimal: str) -> int:
    decimal: int = 0
    hexa_str = list(hexa_decimal)
    hex_values = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' ]
    i = 0
    while hexa_str:
        current_bit: str = hexa_str.pop()
        decimal += pow(16, i) * hex_values.index(current_bit)
        i += 1

    return decimal

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

    # binary = int(input('Enter a binary number: '))
    # decimal = binary_to_decimal(binary)

    # print(f'{decimal=}')

    # hexa_decimal = input('Enter a hexa decimal number: ')
    # decimal_value = hex_to_decimal(hexa_decimal.upper())

    # print(f'{decimal_value=}')

    decimal = int(input('Enter a decimal number: '))
    hex_value = decimal_to_hex(decimal)

    print(f'{hex_value=}')

