import Articulo from "../modelos/articulosModelo.js";
import asyncHandler from "express-async-handler";
const commonError = { msg: `Ha ocurrido un problema inesperado` };

const postArticle = asyncHandler(async (req, res) => {
  const { titulo, descripcionBreve, descripcion, imagen, categoria } = req.body;

  if (!titulo || !descripcionBreve || !descripcion || !categoria) {
    res.status(400).json({ msg: "error al ingresar articulo" });
  } else {
    const article = await Articulo.create({
      titulo,
      descripcionBreve,
      descripcion,
      imagen,
      categoria,
    });
    res.status(200).json(article);
  }
});

const getArticleById = asyncHandler(async (req, res) => {
  const article = await Articulo.findById(req.params.id);
  res.json(article);
});

const deleteArticles = asyncHandler(async (req, res) => {
  const article = await Articulo.findById(req.params.id);
  if (article) {
    await article.deleteOne();
    res.status(200).json({ msg: `user deleted` });
  } else {
    res.status(400).json({ msg: `No articles with id: ${req.params.id}` });
  }
});

const getArticles = asyncHandler(async (req, res) => {
  const articulos = await Articulo.find();
  res.status(200).json(articulos);
  if (!articulos) {
    return res.status(500).json({ msg: `error en la consulta` });
  }
});

const updateArticle = asyncHandler(async (req, res) => {
  const { titulo, descripcionBreve, descripcion, imagen, categoria } = req.body;
  console.log(req.body);
  const articleId = req.params.id;
  const updatedArticle = await Articulo.findByIdAndUpdate(
    articleId,
    {
      titulo,
      descripcionBreve,
      descripcion,
      imagen,
      categoria,
    },
    { new: true }
  );

  if (!updatedArticle) {
    res
      .status(404)
      .json({ msg: `No se encontró el artículo con ID: ${articleId}` });
    return;
  }
  res.status(200).json(updatedArticle);
});

const getArticleByType = asyncHandler(async (req, res) => {
  const commonError = { msg: `Ha ocurrido un problema inesperado` };

  const { type } = req.params;
  const articles = await Articulo.find({ categoria: type }, null, {
    limit: 8,
  }).sort({ createdAt: "desc" });

  if (!articles) return res.status(500).json(commonError);

  return res.status(200).json(articles);
});

const controladorUser = {
  postArticle,
  deleteArticles,
  getArticles,
  updateArticle,
  getArticleById,
  getArticleByType,
};

export default controladorUser;
