import { Router } from "express";
const router = Router();
import controlador from "../controladores/controladorArticulo.js";
import protect from "../middleware/authMiddleware.js";

router.route("/").post(controlador.postArticle);

router.route("/deletepost/:id").delete(controlador.deleteArticles);

router.get("/getarticles", controlador.getArticles);

router.get("/getArticlesBy/:type", controlador.getArticleByType);

router.get("/:id", controlador.getArticleById);

router.patch("/:id", controlador.updateArticle);
export default router;
