import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 5500;
dotenv.config();

import usuarioRoutes from "./routes/usuarioRoutes.js";
import articleRoutes from "./routes/articuloRutas.js";

//Llamar la conexion a la bd aqui

const uri = process.env.DATABASE_URL;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/img")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200);
});

app.use("/api/users", usuarioRoutes);
app.use("/api/articles", articleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
