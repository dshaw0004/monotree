def caesar_cipher(message: str, offset: int) -> str:
    alphabet: str = 'abcdefghijklmnopqrstuvwxyz'
    ciphered_text: str = ''

    for char in message:
        if char == ' ':
            ciphered_text += ' '
            continue
        index = alphabet.find(char.lower())
        ciphered_text += alphabet[(index + offset) % len(alphabet)]

    return ciphered_text


def main():
    text = 'Julius Caesar'
    caesar_ciphered_text = caesar_cipher(text, 4)
    print(f'{caesar_ciphered_text = }')

if '__main__' == __name__:
    main()
