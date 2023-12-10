const express = require("express");
const Cart = require("../models/cart");

const router = express.Router();

//Create
router.post("/insert", async (req, res) => {
    const image = req.body.image;
    const name = req.body.name;
    const varient = req.body.varient;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const newCart = new Cart({
        image,
        name,
        varient,
        price,
        quantity
    });

    newCart
        .save()
        .then(() => {
            res.json("Cart Items Added!");
        })
        .catch((err) => {
            console.log(err);
        });
});

//Retrieve All
router.get("/get/all", async (req, res) => {
    Cart.find()
        .then((carts) => {
            res.json(carts);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
