import mongoose from "mongoose";
import { Schema } from "mongoose";

const articuloSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    titulo: {
      type: String,
      require: true,
      min: 8,
      max: 20,
    },
    descripcionBreve: {
      type: String,
      require: true,
      min: 4,
      max: 20,
    },
    descripcion: {
      type: String,
      require: true,
      min: 20,
      max: 400,
    },
    imagen: {
      type: String,
    },
    categoria: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("articulos", articuloSchema);
