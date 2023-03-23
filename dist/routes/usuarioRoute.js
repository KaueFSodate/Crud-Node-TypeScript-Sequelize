"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
const router = (0, express_1.Router)();
//MiddleWare
const verificarToken_1 = __importDefault(require("../helpers/verificarToken"));
router.post("/", usuarioController_1.default.criarUsuario);
router.get("/checarUsuario", usuarioController_1.default.checarUsuario);
router.get('/checarUsuario/:id', usuarioController_1.default.checarUsuarioPorId);
router.post('/login', usuarioController_1.default.login);
router.put("/:id", verificarToken_1.default, usuarioController_1.default.alterarUsuario);
router.delete("/:id", verificarToken_1.default, usuarioController_1.default.deletarUsuario);
exports.default = router;
