from flask import Flask, render_template, url_for, request, redirect
import mysql.connector

app = Flask(__name__)


database_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'database': 'aula1'
}


connection = mysql.connector.connect(**database_config)
db_cursor = connection.cursor()



@app.route('/')
def home():
    db_cursor.execute("SELECT * FROM funcionarios")
    funcionarios = db_cursor.fetchall()
    return render_template('index.html', funcionarios=funcionarios)
@app.route('/novo_funcionario', methods=['POST'])
def novo_funcionario():
    if request.method == 'POST':
        nome = request.form['primeiro_nome']
        ultimo_nome = request.form['sobrenome']
        admissao = request.form['data_admissao']
        status = request.form['status_funcionario']
        funcionario_dados = (nome, ultimo_nome, admissao, status)
        insert_query = (
            'INSERT INTO funcionarios '
            '(primeiro_nome, sobrenome, data_admissao, status_funcionario) '
            'VALUES (%s, %s, %s, %s)'
        )
        db_cursor.execute(insert_query, funcionario_dados)
        connection.commit()
    return redirect(url_for('home'))

@app.route('/exibir_funcionarios')
def exibir_funcionarios():
    query = 'SELECT * FROM funcionarios'
    db_cursor.execute(query)
    funcionarios = db_cursor.fetchall()
    return render_template('exibir_funcionarios.html', funcionarios=funcionarios)

@app.route('/atualizar_funcionario/<int:id>', methods=['GET', 'POST'])
def atualizar_funcionario(id):
    if request.method == 'POST':
        nome = request.form['primeiro_nome']
        ultimo_nome = request.form['sobrenome']
        admissao = request.form['data_admissao']
        status = request.form['status_funcionario']
        db_cursor.execute('UPDATE funcionarios SET nome=%s, ultimo_nome=%s, admissao=%s, status=%s ',
        (nome, ultimo_nome, admissao, status))
        connection.commit()
        return redirect(url_for('exibir_funcionarios'))
    else:
        query = 'SELECT * FROM funcionarios WHERE id = %s'
        db_cursor.execute(query, (id,))
        funcionario = db_cursor.fetchone()
        return redirect(url_for('home', funcionario=funcionario))

@app.route('/excluir_funcionario/<int:id>')
def excluir_funcionario(id):
    delete_query = 'DELETE FROM funcionarios WHERE id = %s'
    db_cursor.execute(delete_query, (id,))
    connection.commit()
    return redirect(url_for('home'))



if __name__ == '__main__':
    app.run(debug=True)
