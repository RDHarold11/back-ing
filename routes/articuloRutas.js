import { Router } from "express";
const router = Router();
import controlador from "../controladores/controladorArticulo.js";
import protect from "../middleware/authMiddleware.js";

router.route("/").post(controlador.postArticle);

router.route("deletepost/:id").delete(controlador.deleteArticles);

router.get("/getarticles", controlador.getArticles);

<<<<<<< HEAD
router.get("/:id", controlador.getArticleById);
=======
router.get("/getArticlesBy/:type", controlador.getArticleByType);

router.get('/getRecentsArticles', controlador.getRecentArticles);

>>>>>>> 2d1948779b8255707d3fa564c4407de17ac75c58

router.patch("/:id", controlador.updateArticle);
export default router;
