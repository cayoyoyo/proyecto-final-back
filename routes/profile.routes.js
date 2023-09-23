const express = require("express");
const router = express.Router();
const User = require("../models/User.model"); // Importa el modelo de usuario

// Ruta para ver el perfil del usuario
router.get("/:id", (req, res, next) => {
  const userId = req.params.id; // Suponiendo que el ID del usuario está disponible en req.user

  User.findById(userId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Ruta para agregar un producto a favoritos del usuario
router.post("/favoritos/agregar/:id", (req, res) => {
  const userId = req.user._id; // Suponiendo que el ID del usuario está disponible en req.user
  const productoId = req.params.id; // ID del producto a agregar a favoritos

  // Encuentra al usuario por su ID y actualiza su lista de favoritos
  User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoritos: productoId } }, // Agrega el producto a la lista de favoritos si no está presente
    { new: true }, // Devuelve el documento actualizado
    (err, user) => {
      if (err) {
        console.error("Error al agregar el producto a favoritos:", err);
        return res
          .status(500)
          .json({ message: "Error al agregar el producto a favoritos" });
      }

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Envía un mensaje de éxito o el usuario actualizado en la respuesta
      res.json({
        message: "Producto agregado a favoritos con éxito",
        usuario: user,
      });
    }
  );
});

// Ruta para eliminar un producto de favoritos del usuario
router.delete("/favoritos/eliminar/:id", (req, res) => {
  const userId = req.user._id; // Suponiendo que el ID del usuario está disponible en req.user
  const productoId = req.params.id; // ID del producto a eliminar de favoritos

  // Encuentra al usuario por su ID y actualiza su lista de favoritos
  User.findByIdAndUpdate(
    userId,
    { $pull: { favoritos: productoId } }, // Elimina el producto de la lista de favoritos
    { new: true }, // Devuelve el documento actualizado
    (err, user) => {
      if (err) {
        console.error("Error al eliminar el producto de favoritos:", err);
        return res
          .status(500)
          .json({ message: "Error al eliminar el producto de favoritos" });
      }

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Envía un mensaje de éxito o el usuario actualizado en la respuesta
      res.json({
        message: "Producto eliminado de favoritos con éxito",
        usuario: user,
      });
    }
  );
});

module.exports = router;
