const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// Ruta para ver el perfil del usuario
router.get("/:id", (req, res, next) => {
  const userId = req.params.id; 

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
router.post("/:id/favorites/add", (req, res, next) => {
    const userId = req.params.id;
    const productId = req.body.productId; 
  
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        if (user.favoriteProducts.includes(productId)) {
          return res.status(400).json({ message: "The product is already in favorites" });
        }
  
        user.favoriteProducts.push(productId);
  
        return user.save();
      })
      .then((user) => {
        const filteredUser = {
          _id: user._id,
          email: user.email,
          name: user.name,
          favoriteProducts: user.favoriteProducts,
        };
  
        res.status(200).json({ message: "Product added to favorites successfully", user: filteredUser });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
      });
  });
  
  
  
// Ruta para eliminar un producto de favoritos del usuario
router.delete("/:id/favorites/remove", (req, res, next) => {
    const userId = req.params.id;
    const productId = req.body.productId; 
  
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        const productIndex = user.favoriteProducts.indexOf(productId);
        if (productIndex === -1) {
          return res.status(400).json({ message: "The product is not in favorites" });
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
  
        res.status(200).json({ message: "Product removed from favorites successfully", user: filteredUser });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
      });
  });
  
  
  

module.exports = router;
