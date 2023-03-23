"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pegarToken_1 = __importDefault(require("./pegarToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'AX88GH9H38KG0B0304LG';
const verificarToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json({ message: "Acesso negado" });
    }
    const pegaToken = (0, pegarToken_1.default)(req);
    if (!pegaToken) {
        res.json({ message: "Acesso negado" });
    }
    try {
        const verified = jsonwebtoken_1.default.verify(pegaToken, secret);
        req.usuario = verified;
        next();
    }
    catch (error) {
        res.json({ message: "Acesso negado", error });
    }
};
exports.default = verificarToken;
