import { Router } from "express";
const router = Router();
import controlador from "../controladores/controladorUsuario.js";

router.post("/login", controlador.loginUser);

export default router;
