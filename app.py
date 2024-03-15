from flask import Flask, request, render_template, redirect, url_for
import secrets

app = Flask(__name__)

# Unikalny kod do logowania
login_code = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    global login_code
    if request.method == 'POST':
        login_code = secrets.token_hex(4)  # Generowanie unikalnego kodu
        return redirect(url_for('login_code'))  # Tutaj następuje przekierowanie na stronę z kodem logowania
    return render_template('login.html')

@app.route('/login_code', methods=['GET'])
def login_code():
    global login_code
    return render_template('login_code.html', login_code=login_code)

@app.route('/verify', methods=['POST'])
def verify():
    global login_code
    if request.form.get('code') == login_code:
        return "Zalogowano pomyślnie!"
    else:
        return "Błędny kod logowania."

if __name__ == '__main__':
    app.run(debug=True)
