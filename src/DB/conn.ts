import { Sequelize } from "sequelize-typescript";
import { usuarios } from "../models/usuarios";

const connection = new Sequelize("usuario", "root", "bnd43qhq", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  models: [usuarios],
});

export default connection;