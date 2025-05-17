from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # 用于flash消息

def validate_login(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE username=? AND password=?', (username, password))
    result = cursor.fetchone()
    conn.close()
    return result is not None

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form['username']
        pwd = request.form['password']
        if validate_login(user, pwd):
            return f"<h1>欢迎回来, {user}!</h1>"
        else:
            flash('用户名或密码错误')
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, email TEXT, password TEXT)')
    cursor.execute('SELECT * FROM users WHERE username=?', (username,))
    if cursor.fetchone():
        conn.close()
        return jsonify({'status': 'fail', 'msg': '用户名已存在'})
    cursor.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
    conn.commit()
    conn.close()
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)
