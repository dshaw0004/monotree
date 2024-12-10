'''
This program uses two pointer method to check 
if a number or string is palindrome or not.
'''
def is_palindrome(text: str) -> bool:
    l: int = 0
    r: int = len(text) - 1

    while r > l:
        if text[l] != text[r]:
            return False
        l += 1
        r -= 1

    return True


def main() -> None:
    text: str = input('Enter something to check for palindrome: ')
    print(f'{text} is{"" if is_palindrome(text=text.upper()) else " not"} palindrome.')


if '__main__' == __name__:
    main()
