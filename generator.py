import random
import string

def generate_login_code(length=6):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

if __name__ == "__main__":
    login_code = generate_login_code()
    print("Wygenerowany kod logowania:", login_code)
