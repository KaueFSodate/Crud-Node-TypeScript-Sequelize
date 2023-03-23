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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuarios_1 = require("../models/usuarios");
const secret = 'AX88GH9H38KG0B0304LG';
// Helpers
const criarToken_1 = __importDefault(require("../helpers/criarToken"));
const pegarToken_1 = __importDefault(require("../helpers/pegarToken"));
const pegarUsuarioToken_1 = __importDefault(require("../helpers/pegarUsuarioToken"));
class usersController {
}
_a = usersController;
usersController.criarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, senha } = req.body;
    // Validações 
    if (!nome) {
        res.json({ message: "Insira um nome" });
        return;
    }
    if (!senha) {
        res.json({ message: "Insira uma senha" });
        return;
    }
    // Criar senha criptografada
    const salt = yield bcrypt_1.default.genSalt(12);
    const senhaHash = yield bcrypt_1.default.hash(senha, salt);
    const usuario = new usuarios_1.usuarios({
        nome: nome,
        senha: senhaHash
    });
    const UsuarioT = yield usuario.save();
    yield (0, criarToken_1.default)(req, res, UsuarioT);
});
usersController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, senha } = req.body;
    if (!nome) {
        res.json({ message: "Insira um nome" });
        return;
    }
    if (!senha) {
        res.json({ message: "Insira uma senha" });
        return;
    }
    // Checar usuario
    const Usuario = yield usuarios_1.usuarios.findOne({
        where: {
            nome: nome
        }
    });
    if (!Usuario) {
        res.json({ message: "Usuario não existe" });
        return;
    }
    // Checar senha
    const existeSenha = yield bcrypt_1.default.compare(senha, Usuario.senha);
    if (!existeSenha) {
        res.json({ message: "Senha invalida!" });
        return;
    }
    yield (0, criarToken_1.default)(req, res, Usuario);
});
usersController.checarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let currentUser;
    if (req.headers.authorization) {
        const token = (0, pegarToken_1.default)(req);
        console.log(token); // Mostra o toke sem o 'bearer'
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        currentUser = yield usuarios_1.usuarios.findByPk(decoded.id);
    }
    else {
        currentUser = null;
    }
    res.json({ message: currentUser });
});
usersController.deletarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield usuarios_1.usuarios.destroy({ where: { id } });
    return res
        .status(200)
        .json({ message: "Usuario deletado com sucesso" });
});
usersController.checarUsuarioPorId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarios_1.usuarios.findByPk(id);
    return res
        .status(200)
        .json({ message: "Usuario listado por id com sucesso", data: usuario });
});
usersController.alterarUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Checa se o usuário existe e pegar o usuario
    const token = (0, pegarToken_1.default)(req);
    const usuario = yield (0, pegarUsuarioToken_1.default)(res, token);
    const { nome, senha } = req.body;
    usuario.id = id;
    // Validações 
    if (!nome) {
        res.json({ message: "Insira um nome" });
        return;
    }
    usuario.nome = nome;
    console.log(usuario.nome);
    if (!senha) {
        res.json({ message: "Insira uma senha" });
        return;
    }
    // Criar senha criptografada
    const salt = yield bcrypt_1.default.genSalt(12);
    const senhaHash = yield bcrypt_1.default.hash(senha, salt);
    usuario.senha = senhaHash;
    console.log(usuario.dataValues);
    try {
        yield usuarios_1.usuarios.update(usuario.dataValues, {
            where: {
                id: req.params.id
            }
        });
        const updatedUsuarios = yield usuarios_1.usuarios.findByPk(id);
        res.status(200).json({ msg: "Usuario alterado com sucesso", data: updatedUsuarios });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = usersController;
