const express = require('express');
const notaFiscalController = require('../controllers/notaFiscalController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Aplicar autenticação em todas as rotas
router.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     NotaFiscal:
 *       type: object
 *       required:
 *         - numero
 *         - tipo
 *         - valor
 *         - data
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da nota fiscal
 *         numero:
 *           type: string
 *           description: Número da nota fiscal
 *         tipo:
 *           type: string
 *           enum: [entrada, saida]
 *           description: Tipo da nota fiscal
 *         valor:
 *           type: number
 *           format: decimal
 *           description: Valor da nota fiscal
 *         data:
 *           type: string
 *           format: date-time
 *           description: Data da nota fiscal
 *         fornecedor:
 *           type: string
 *           description: Nome do fornecedor (para notas de entrada)
 *         cliente:
 *           type: string
 *           description: Nome do cliente (para notas de saída)
 *         observacoes:
 *           type: string
 *           description: Observações adicionais
 */

/**
 * @swagger
 * /api/notas-fiscais:
 *   get:
 *     summary: Lista todas as notas fiscais
 *     tags: [Notas Fiscais]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notas fiscais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NotaFiscal'
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/', notaFiscalController.listar);

/**
 * @swagger
 * /api/notas-fiscais:
 *   post:
 *     summary: Cria uma nova nota fiscal
 *     tags: [Notas Fiscais]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotaFiscal'
 *           example:
 *             numero: "NF001"
 *             tipo: "entrada"
 *             valor: 1500.50
 *             data: "2024-01-15T10:30:00Z"
 *             fornecedor: "Fornecedor ABC"
 *             observacoes: "Primeira nota fiscal"
 *     responses:
 *       201:
 *         description: Nota fiscal criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotaFiscal'
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.post('/', notaFiscalController.criar);

/**
 * @swagger
 * /api/notas-fiscais/{id}:
 *   get:
 *     summary: Busca uma nota fiscal por ID
 *     tags: [Notas Fiscais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da nota fiscal
 *     responses:
 *       200:
 *         description: Nota fiscal encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotaFiscal'
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Nota fiscal não encontrada
 */
router.get('/:id', notaFiscalController.buscarPorId);

/**
 * @swagger
 * /api/notas-fiscais/{id}:
 *   put:
 *     summary: Atualiza uma nota fiscal
 *     tags: [Notas Fiscais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da nota fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotaFiscal'
 *     responses:
 *       200:
 *         description: Nota fiscal atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotaFiscal'
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.put('/:id', notaFiscalController.atualizar);

/**
 * @swagger
 * /api/notas-fiscais/{id}:
 *   delete:
 *     summary: Deleta uma nota fiscal
 *     tags: [Notas Fiscais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da nota fiscal
 *     responses:
 *       204:
 *         description: Nota fiscal deletada com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.delete('/:id', notaFiscalController.deletar);

module.exports = router;