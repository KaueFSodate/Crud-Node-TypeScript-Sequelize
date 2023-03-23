import { Router } from "express";

import userController from "../controllers/usuarioController"

const router = Router();

//MiddleWare
import verificarToken from "../helpers/verificarToken";

router.post("/", userController.criarUsuario);

router.get("/checarUsuario", userController.checarUsuario);

router.get('/checarUsuario/:id', userController.checarUsuarioPorId);

router.post('/login', userController.login);

router.put("/:id", verificarToken, userController.alterarUsuario);

router.delete("/:id", verificarToken, userController.deletarUsuario);

export default router;