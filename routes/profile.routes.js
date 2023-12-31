const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const cloudinaryProfileConfig = require("../config/cloudinaryconfigProfile");
const upload = require("../config/cloudinaryconfigProfile");

// Ruta para ver el perfil del usuario
router.get("/:id", (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .populate("productsForSale")
    .populate("favoriteProducts")
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
});

router.put("/:userId/add-product/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  User.findByIdAndUpdate(
    userId,
    { $push: { productsForSale: productId } }, // Adicionar productId ao array productsForSale
    { new: true } // Retorna o usuário atualizado
  )

    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Ruta para editar el perfil

router.put("/:id/edit-profile", upload.single("profile-photo"), (req, res) => {
  
  const userId = req.params.id;
  const { name, location } = req.body;

  const updatedFields = { name, location };
  console.log("REQ.FILE", req.file);

  // Verifica si se cargó una nueva foto de perfil
  if (req.file) {
    const profileImageUrl = req.file.path;
    updatedFields.avatar = profileImageUrl;
  }


  // Actualiza el usuario con los campos actualizados
  User.findByIdAndUpdate(userId, updatedFields, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      console.log("USUARIO ACTUALIZADO:", updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Ruta para administrar los favoritos de un usuario
router.post("/:id/favorites", (req, res, next) => {
  const userId = req.params.id;
  const productId = req.body.productId; // Id del producto a agregar o eliminar
  const action = req.body.action; // "add" o "remove"

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (action === "add") {
        if (user.favoriteProducts.includes(productId)) {
          console.log(" Producto ya está en favoritos");
        } else {
          user.favoriteProducts.push(productId);
        }
      } else if (action === "remove") {
        const productIndex = user.favoriteProducts.indexOf(productId);
        if (productIndex === -1) {
          return res
            .status(400)
            .json({ message: "The product is not in favorites" });
        }

        user.favoriteProducts.splice(productIndex, 1);
      } else {
        return res.status(400).json({ message: "Invalid action" });
      }

      return user.save();
    })
    .then((user) => {
      const filteredUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
        favoriteProducts: user.favoriteProducts,
      };

      let message = "";
      if (action === "add") {
        message = "Product added to favorites successfully";
      } else if (action === "remove") {
        message = "Product removed from favorites successfully";
      }

      res.status(200).json({
        message,
        user: filteredUser,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
});

// Ruta para eliminar un producto de favoritos
router.post("/:id/favorites/remove", (req, res, next) => {
  const userId = req.params.id;
  const productId = req.body.productId;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const productIndex = user.favoriteProducts.indexOf(productId);
      if (productIndex === -1) {
        return res
          .status(400)
          .json({ message: "The product is not in favorites" });
      }

      user.favoriteProducts.splice(productIndex, 1);

      return user.save();
    })
    .then((user) => {
      const filteredUser = {
        _id: user._id,
        email: user.email,
        name: user.name,
        favoriteProducts: user.favoriteProducts,
      };

      res.status(200).json({
        message: "Product removed from favorites successfully",
        user: filteredUser,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
});

module.exports = router;
