const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ["used", "new", "like new"],
  },
  images: [String],
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "Electrodomésticos",
      "Muebles",
      "Electrónica",
      "Ropa y Accesorios",
      "Herramientas",
      "Juguetes",
      "Vehículos",
      "Deportes y Fitness",
      "Arte y Antigüedades",
      "Libros y Revistas",
      "Otros",
    ],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
