import express from "express";
import usuarioRoutes from "./routes/usuarioRoute";
import { json, urlencoded } from "body-parser";
import connection from "./DB/conn";
const port: number = 3000
const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/usuario", usuarioRoutes);


connection.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server rodando na porta ${port}`)
    })
}).catch((error) => {console.log(error)})