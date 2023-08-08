import { Router } from "express";
const router = Router();
import controlador from "../controladores/controladorArticulo.js";
import protect from "../middleware/authMiddleware.js";

router.route("/").post(protect, controlador.postArticle);

router.route("deletepost/:id").delete(protect, controlador.deleteArticles);

router.get("/getarticles", controlador.getArticles);

export default router;
