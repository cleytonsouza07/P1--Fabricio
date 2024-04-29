
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const userRepository = require('./repositories/UserRepository');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://cleytonsouza476:123@cluster0.fca34oe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database conectada com sucesso");
  } catch (error) {
    console.error('Falha ao conectar database', error);
  }
};

connectDatabase();

const criarUsuario = async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Usuário adicionado com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).json({ message: 'Erro ao adicionar usuário' });
  }
};

const serveLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userRepository.findUserByUsername(username);
    if (user && user.password === password) {
      res.redirect('http://127.0.0.1:5000/');
    } else {
      res.status(401).send("<script>alert('Username ou senha incorretos');</script>");
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send("Erro interno do servidor");
  }
};

app.post('/usuarios/registrar', criarUsuario);
app.get('/pagina-login', serveLoginPage);
app.post('/pagina-login', loginUser);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});