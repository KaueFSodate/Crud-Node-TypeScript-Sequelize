"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarioRoute_1 = __importDefault(require("./routes/usuarioRoute"));
const body_parser_1 = require("body-parser");
const conn_1 = __importDefault(require("./DB/conn"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/usuario", usuarioRoute_1.default);
conn_1.default.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server rodando na porta ${port}`);
    });
}).catch((error) => { console.log(error); });
