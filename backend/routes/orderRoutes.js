const express = require("express");
const Order = require("../models/order");

const router = express.Router();

//Create
router.post("/insert", async (req, res) => {
    const foodName = req.body.foodName;
    const unitPrice = Number (req.body.unitPrice);
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const customername = req.body.customername;
    const customerid = req.body.customerid;
    const orderType = req.body.orderType;
    const orderStatus = Number(req.body.orderStatus);
    const telephone = req.body.telephone;

    const newOrder = new Order({
        foodName,
        unitPrice,
        price,
        quantity,
        customername,
        customerid,
        orderType,
        orderStatus,
        telephone,
    });

    newOrder
        .save()
        .then(() => {
            res.json("Order Added!");
        })
        .catch((err) => {
            console.log(err);
        });
});

//Retrieve All Orders
router.get("/get/all", async (req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders);
        })
        .catch((err) => {
            console.log(err);
        });
});

//Retrieve Only One Order
router.get("/get/one/:id", async (req, res) => {
    const orderId = req.params.id
    try {
        const orders = await Order.findById(orderId);
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Orders
router.get("/get/order", async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: "1" });
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Order Count
router.get("/get/order/count", async (req, res) => {
    try {
        const count = await Order.countDocuments({ orderStatus: "1" });
        res.json({ count });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Change New order to Pending Order
router.put("/update/pending/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {
            orderStatus: 2,
        });

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//Retrieve Pending Orders
router.get("/get/pending", async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: "2" });
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Pending Order Count
router.get("/get/pending/count", async (req, res) => {
    try {
        const count = await Order.countDocuments({ orderStatus: "2" });
        res.json({ count });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Complete Orders
router.get("/get/complete", async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: "3" });
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Complete Order Count
router.get("/get/complete/count", async (req, res) => {
    try {
        const count = await Order.countDocuments({ orderStatus: "3" });
        res.json({ count });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Delivering Orders
router.get("/get/delivering", async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: "4" });
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Delivering Order Count
router.get("/get/delivering/count", async (req, res) => {
    try {
        const count = await Order.countDocuments({ orderStatus: "4" });
        res.json({ count });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Change Complete Order to Delivering Order
router.put("/update/delivering/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {
            orderStatus: 4,
        });

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//Retrieve Delivered Orders
router.get("/get/delivered", async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: "5" });
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Pending Order Count
router.get("/get/delivered/count", async (req, res) => {
    try {
        const count = await Order.countDocuments({ orderStatus: "5" });
        res.json({ count });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Cancel Orders
router.get("/get/cancel", async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: "0" });
        res.json(orders);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Retrieve Cancel Order Count
router.get("/get/cancel/count", async (req, res) => {
    try {
        const count = await Order.countDocuments({ orderStatus: "0" });
        res.json({ count });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

//Update Manual Order
router.put("/update/:id", async (req, res) => {
    let orderId = req.params.id;

    const {
        customername,
        orderType,
        telephone,
        orderStatus,
        foodName,
        quantity,
        unitPrice,
    } = req.body; //D structure

    const updateOrder = {
        customername,
        orderType,
        telephone,
        orderStatus,
        foodName,
        quantity,
        unitPrice,
    };

    const update = await Order.findByIdAndUpdate(orderId, updateOrder)
        .then(() => {
            res.status(200).send({ status: "Order Updated!" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
                status: "Error with Updating Data!",
                error: err.message,
            });
        });
});

//Delete
router.delete("/delete/:id", (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send("Order Deleted!");
        })
        .catch((err) => {
            return res.status(500).send("Error orcurred");
        });
});

module.exports = router;
