const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const authController = {
  // Registrar novo usuário
  async registrar(req, res) {
    try {
      const { nome, email, senha, perfil } = req.body;
      
      // Verificar se usuário já existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email }
      });
      
      if (usuarioExistente) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      
      // Criptografar senha
      const senhaHash = await bcrypt.hash(senha, 10);
      
      // Criar usuário
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHash,
          perfil: perfil || 'usuario'
        }
      });
      
      // Remover senha da resposta
      const { senha: _, ...usuarioSemSenha } = usuario;
      
      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  },

  // Login
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      
      // Buscar usuário
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });
      
      if (!usuario || !usuario.ativo) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      // Verificar senha
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhaValida) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      // Gerar token JWT
      const token = jwt.sign(
        { 
          id: usuario.id, 
          email: usuario.email, 
          perfil: usuario.perfil 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Remover senha da resposta
      const { senha: _, ...usuarioSemSenha } = usuario;
      
      res.json({
        token,
        usuario: usuarioSemSenha
      });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  },

  // Verificar token
  async verificarToken(req, res) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: req.usuario.id }
      });
      
      if (!usuario || !usuario.ativo) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
      
      const { senha: _, ...usuarioSemSenha } = usuario;
      res.json(usuarioSemSenha);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar token' });
    }
  }
};

module.exports = authController;