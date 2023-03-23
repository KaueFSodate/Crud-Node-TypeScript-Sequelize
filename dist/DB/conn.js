"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const usuarios_1 = require("../models/usuarios");
const connection = new sequelize_typescript_1.Sequelize("usuario", "root", "bnd43qhq", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    models: [usuarios_1.usuarios],
});
exports.default = connection;
