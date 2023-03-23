"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_1 = require("../models/usuarios");
const secret = 'AX88GH9H38KG0B0304LG';
// Pegar usuário por token
const pegarUsuarioToken = (res, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        res.json({ message: "Acesso negado" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    const usuarioid = decoded.id;
    const usuario = yield usuarios_1.usuarios.findByPk(usuarioid);
    return usuario;
});
exports.default = pegarUsuarioToken;
