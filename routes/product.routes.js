const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinaryconfig');
const Product = require("../models/Producto.model");

// router.get('/', (req, res, next) => {

// });

//  TODOS LOS PRODUCTOS --------------------------- funciona OK
router.get("/", (req, res, next) => {
  const searchTerm = req.query.term; // Obtén el término de búsqueda de la consulta

  let query = {}; // Consulta inicial para obtener todos los productos

  if (searchTerm) {
    // Si se proporciona un término de búsqueda, ajusta la consulta para la búsqueda
    query = {
      title: { $regex: searchTerm, $options: "i" }, // Realiza una búsqueda insensible a mayúsculas y minúsculas en el campo "title"
    };
  }

  Product.find(query)
    .then((products) => {
      console.log("quiero saber que devuelve products " + products);
      const productsReverse = products.reverse()
      res.status(200).json(productsReverse); // Devuelve una respuesta JSON con los productos
    })
    .catch((error) => {
      console.error("Error al recuperar los productos:", error);
      res.status(500).json({ error: "Error al recuperar los productos" });
    });
});


// DETALLES DE UN UNICO PRODUCTO --------------------------- funciona OK
router.get("/:id", (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId)
    .populate("seller")
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.status(200).json(product); // Devuelve un JSON con los detalles del producto
    })
    .catch((error) => {
      console.error("Error al obtener los detalles del producto:", error);
      res
        .status(500)
        .json({ error: "Error al obtener los detalles del producto" });
    });
});

// CREAR UN NUEVO PRODUCTO  --------------------------- funciona OK
router.post('/add', fileUploader.single('product-image'), (req, res) => {
  const { title, description, price, condition, images, seller } = req.body;

  // Utiliza el modelo Product para crear y guardar un nuevo producto en la base de datos
  Product.create({
    title,
    description,
    price,
    condition,
    images: [req?.file?.path], // Asígnale la imagen al campo images como un arreglo de una sola imagen
    seller,
  })
    .then((newlyCreatedProductFromDB) => {
      // Envía una respuesta con el producto recién creado
      res.json(newlyCreatedProductFromDB);
    })
    .catch((error) => {
      console.error(`Error while creating a new product: ${error}`);
      res.status(500).json({ error: 'Error while creating a new product' });
    });
});

// EDITAR UN PRODUCTO  --------------------------- funciona OK
router.put("/:id/edit", (req, res, next) => {
  const productId = req.params.id;
  const { title, description, price, condition, images } = req.body;

  const updateProduct = {
    title,
    description,
    price,
    condition,
    images,
  };

  Product.findByIdAndUpdate(productId, updateProduct, { new: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.status(200).json(updatedProduct);
    })
    .catch((error) => {
      console.error("Error al editar el producto:", error);
      res.status(500).json({ error: "Error al editar el producto" });
    });
});

// ELIMINAR UN PRODUCTO --------------------------- funciona OK
router.delete("/:id/delete", (req, res, next) => {
  const productId = req.params.id;

  Product.findByIdAndRemove(productId)
    .then(() => {
      res.status(200).json({ message: "Producto eliminado con éxito" });
    })
    .catch((error) => {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({ error: "Error al eliminar el producto" });
    });
});

module.exports = router;
