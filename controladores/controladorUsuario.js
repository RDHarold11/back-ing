import Usuario from "../modelos/usuarioModelo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Articulo from "../modelos/articulosModelo.js";

//Para generar el token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const loginUser = asyncHandler(async (req, res) => {
  const { user, password } = req.body;

  const User = await Usuario.findOne({ user: user });
  if (user && (await bcrypt.compare(password, User.password))) {
    res.json({
      _id: User.id,
      user: User.user,
      token: generateToken(User.id),
    });
  }
  res.status(400).json({ msg: "Invalid credentials" });
});

const postArticle = asyncHandler(async (req, res) => {
  const { user, titulo, descripcionBreve, descripcion, imagen, categoria } =
    req.body;
  if (
    !user ||
    !titulo ||
    !descripcionBreve ||
    !descripcion ||
    !imagen ||
    !categoria
  ) {
    res.status(400).json({ msg: "error al ingresar articulo" });
  }

  const article = await Articulo.create({
    user: req.user.id,
    titulo,
    descripcionBreve,
    descripcion,
    imagen,
    categoria,
  });
  res.status(200).json(article);
});

const controlador = {
  loginUser,
  postArticle,
};

export default controlador;
