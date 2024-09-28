const codeService = require('../services/codeService');

// Função para criar um novo código
const createCode = async (req, res) => {
  const { userId, codeValue } = req.body;

  try {
    const code = await codeService.createCode(userId, codeValue);
    return res.status(201).json({ message: 'Code created successfully', code });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating code', error });
  }
};

// Função para deletar um código
const deleteCode = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await codeService.deleteCode(id);
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Code not found' });
    }
    return res.status(200).json({ message: 'Code deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting code', error });
  }
};

// Função para listar todos os códigos de um usuário
const getCodesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const codes = await codeService.getCodesByUserId(userId);
    return res.status(200).json(codes);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching codes', error });
  }
};

// Função para listar todos os códigos
const getAllCodes = async (req, res) => {
  try {
    const codes = await codeService.getAllCodes();
    return res.status(200).json(codes);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching codes', error });
  }
};




module.exports = {
  createCode,
  deleteCode,
  getCodesByUserId,
  getAllCodes,

};
