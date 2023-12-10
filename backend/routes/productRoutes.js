const express = require("express");
const router = express.Router();
const product = require("../models/product");

router.get('/', (req, res) => {
    // Retrieve all the products from the database and send them in res.send. Replace that with the sample message.
    product.find().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error(error);
    })
});


//get product count
router.get("/allcount", async (req, res) => {
    product.countDocuments().then((count)=>{
        res.json(count);
    }).catch((err)=>{
        console.log(err.message);
    })
});


router.get('/:id', (req, res) => {
    // Retrieve product with particular Id from the database and send them in res.send. Replace that with the sample message.
    product.findById(req.params.id).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error(error);
    })
});

router.post('/', (req, res) => {
    // Insert product data to the database and send the successfull response in res.send. Replace that with the sample message.
    return new Promise((resolve, reject) => {
        const newProduct = new product(
            {
                name: req.body.name,
                varients: req.body.varients,
                prices: req.body.prices,
                category: req.body.category,
                image: req.body.image,
                description: req.body.description
            }
        )

        resolve(newProduct);
    }).then((result) => {
        result.save();
        return result;
    }).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error(error);
    })
});

router.put('/:id', (req, res) => {
    // Update the product with particular Id in the database and send the successfull response in res.send. Replace that with the sample message.
    product.findById(req.params.id).then((result) => {
        result.name = req.body.name;
        result.varient = req.body.varient;
        result.prices = req.body.prices;
        result.category = req.body.category;
        result.image = req.body.image;
        result.description = req.body.description;

        return result;
    }).then((result) => {
        result.save()
        return result;
    }).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
    });
});

router.delete('/:id', (req, res) => {
    // Delete product with particular Id from the database and send the successfull response in res.send. Replace that with the sample message.
    product.findByIdAndDelete(req.params.id).then((result) => {
        res.send(result);
    }).catch((error) => {
        console.error(error);
    })
});







module.exports = router;