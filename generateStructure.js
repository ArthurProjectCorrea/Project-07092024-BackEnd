// generateStructure.js
const fs = require("fs");
const path = require("path");

// Pega o nome do model passado como argumento
const modelName = process.argv[2];
if (!modelName) {
  console.log("Por favor, forneça o nome do modelo.");
  process.exit(1);
}

// Nome do model com a primeira letra maiúscula
const modelNameCapitalized =
  modelName.charAt(0).toUpperCase() + modelName.slice(1);

// Templates para os arquivos que serão criados
const controllerTemplate = `
// api/controllers/${modelName}Controller.js
const ${modelName}Service = require('../services/${modelName}Service');

module.exports = {
  async create(req, res) {
    const data = req.body;
    try {
      const result = await ${modelName}Service.create(data);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const results = await ${modelName}Service.getAll();
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
`;

const serviceTemplate = `
// api/services/${modelName}Service.js
const { ${modelNameCapitalized} } = require('../models');

module.exports = {
  async create(data) {
    const result = await ${modelNameCapitalized}.create(data);
    return result;
  },

  async getAll() {
    const results = await ${modelNameCapitalized}.findAll();
    return results;
  },
};
`;

const routeTemplate = `
// api/routes/${modelName}Routes.js
const express = require('express');
const ${modelName}Controller = require('../controllers/${modelName}Controller');
const router = express.Router();

router.post('/', ${modelName}Controller.create);
router.get('/', ${modelName}Controller.getAll);

module.exports = router;
`;

// Caminhos dos arquivos
const paths = {
  controller: path.join(__dirname, `api/controllers/${modelName}Controller.js`),
  service: path.join(__dirname, `api/services/${modelName}Service.js`),
  route: path.join(__dirname, `api/routes/${modelName}Routes.js`),
};

// Função para criar arquivos
const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, { flag: "wx" }, (err) => {
    if (err) throw err;
  });
};

// Criar arquivos se não existirem
try {
  createFile(paths.controller, controllerTemplate);
  createFile(paths.service, serviceTemplate);
  createFile(paths.route, routeTemplate);
  console.log("Arquivos criados com sucesso.");
} catch (err) {
  console.log("Erro ao criar arquivos:", err.message);
}
