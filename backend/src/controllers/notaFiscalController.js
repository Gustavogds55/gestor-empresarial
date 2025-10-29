const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const notaFiscalController = {
  // Listar todas as notas fiscais
  async listar(req, res) {
    try {
      const notas = await prisma.notaFiscal.findMany({
        orderBy: { data: 'desc' }
      });
      res.json(notas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar notas fiscais' });
    }
  },

  // Criar nova nota fiscal
  async criar(req, res) {
    try {
      const nota = await prisma.notaFiscal.create({
        data: req.body
      });
      res.status(201).json(nota);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar nota fiscal' });
    }
  },

  // Buscar nota por ID
  async buscarPorId(req, res) {
    try {
      const nota = await prisma.notaFiscal.findUnique({
        where: { id: parseInt(req.params.id) }
      });
      if (!nota) {
        return res.status(404).json({ error: 'Nota fiscal não encontrada' });
      }
      res.json(nota);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar nota fiscal' });
    }
  },

  // Atualizar nota fiscal
  async atualizar(req, res) {
    try {
      const nota = await prisma.notaFiscal.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
      });
      res.json(nota);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar nota fiscal' });
    }
  },

  // Deletar nota fiscal
  async deletar(req, res) {
    try {
      await prisma.notaFiscal.delete({
        where: { id: parseInt(req.params.id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Erro ao deletar nota fiscal' });
    }
  }
};

module.exports = notaFiscalController;