const { Code } = require('../models'); // Certifique-se de que o modelo Code está corretamente importado

// Função para criar um novo código
const createCode = async (userId, codeValue) => {
  const code = await Code.create({
    userId,
    code: codeValue,
  });
  return code;
};

// Função para deletar um código pelo ID
const deleteCode = async (codeId) => {
  const deletedCount = await Code.destroy({ where: { id: codeId } });
  return deletedCount; // Retorna o número de registros deletados (0 ou 1)
};

// Função para listar todos os códigos de um usuário
const getCodesByUserId = async (userId) => {
  const codes = await Code.findAll({ where: { userId } });
  return codes; // Retorna todos os códigos associados ao usuário
};

// Função para listar todos os códigos no sistema
const getAllCodes = async () => {
  const codes = await Code.findAll();
  return codes; // Retorna todos os códigos no banco de dados
};

const getCodeByValue = async (codeValue) => {
  return Code.findOne({
    where: { code: codeValue },
  });
};



module.exports = {
  createCode,
  deleteCode,
  getCodesByUserId,
  getAllCodes,
  getCodeByValue,
};
