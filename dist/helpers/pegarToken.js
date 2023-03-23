"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pegarToken = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    return token;
};
exports.default = pegarToken;
