var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://<user>:<password>@ds143340.mlab.com:43340/******', ['products']);

//Get All Products
router.get('/products', function(req, res, next) {

    db.products.find(function(err, products) {
        if (err) {
            res.send(err);
        }
        res.json(products);
    });
});

//Get Single Product
router.get('/product/:id', function(req, res, next) {

    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

//Save Product
router.post('/product', function(req, res, next) {
    var product = req.body;
    if (!product.title || !(product.price + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.products.save(product, function(err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
});

//Delete Product
router.delete('/product/:id', function(req, res, next) {

    db.products.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, product) {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
});

//Update Product
router.put('/product/:id', function(req, res, next) {
    var product = req.body;
    var updProduct = {};

    if (product.price) {
        updProduct.price = product.price;
    }

    if (product.title) {
        updProduct.title = product.title;
    }

    if (!updProduct) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {

        db.products.update({ _id: mongojs.ObjectId(req.params.id) }, updProduct, {}, function(err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
});

module.exports = router;