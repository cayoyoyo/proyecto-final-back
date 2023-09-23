const express = require('express');
const router = express.Router();
const Product = require('../models/Producto.model');
const User = require('../models/User.model')

// router.get('/', (req, res, next) => {

// });


//  TODOS LOS PRODUCTOS --------------------------- funciona OK
router.get('/', (req, res, next) => { //todas las rutas aqui tienen el "/product" antes 
    Product.find()
        .then((products) => {
            console.log("quiero saber que devuelve products " + products)
            res.status(200).json(products); // Devuelve una respuesta JSON con los productos
        })
        .catch((error) => {
            console.error('Error al recuperar los productos:', error);
            res.status(500).json({ error: 'Error al recuperar los productos' });
        });
});

// DETALLES DE UN UNICO PRODUCTO --------------------------- funciona OK
router.get('/:id', (req, res, next) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.status(200).json(product); // Devuelve un JSON con los detalles del producto 
        })
        .catch((error) => {
            console.error('Error al obtener los detalles del producto:', error);
            res.status(500).json({ error: 'Error al obtener los detalles del producto' });
        });
});

// CREAR UN NUEVO PRODUCTO  --------------------------- funciona OK
router.post('/add', (req, res, next) => {

    const { title, description, price, condition, images, seller } = req.body;

    const newProduct = new Product({
        title,
        description,
        price,
        condition,
        images,
        seller
    });

    newProduct
        .save()
        .then((product) => {
            return User.findById(seller)
                .then((user) => {
                    if (!user) {
                        throw new Error('Usuario no encontrado');
                    }
                    user.productsForSale.push(product._id);
                    return user.save();
                })
                .then(() => {
                    res.status(201).json(product);
                });
        })
        .catch((error) => {
            console.error('Error al crear un nuevo producto:', error);
            res.status(500).json({ error: 'Error al crear un nuevo producto' });
        });

});

// EDITAR UN PRODUCTO  --------------------------- funciona OK
router.get('/:id/edit', (req, res, next) => {

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
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.status(200).json(updatedProduct);
        })
        .catch((error) => {
            console.error('Error al editar el producto:', error);
            res.status(500).json({ error: 'Error al editar el producto' });
        });

});

// DELETAR UN PRODUCTO --------------------------- funciona OK
router.get('/:id/delete', (req, res, next) => {

    const productId = req.params.id;

    Product.findByIdAndRemove(productId)
        .then(() => {
            res.status(200).json({ message: 'Producto eliminado con éxito' });
        })
        .catch((error) => {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        });

});

module.exports = router;
