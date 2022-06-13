const routes = require("express").Router();
const LugarController = require("../controllers/LugarControllers");

routes.get("/", LugarController.getAll);
routes.get("/lugares/:id", LugarController.getById);
routes.get("/criar", LugarController.criar);
routes.post("/criacao", LugarController.criacao);
routes.get("/editar/:id", LugarController.editar1);
routes.post("/editar/:id", LugarController.editar);
routes.get("/deletar/:id", LugarController.deletar);
routes.post("/deletar/:id", LugarController.deletar1);
routes.post("/pesquisa", LugarController.pesquisaNome);
module.exports = routes;