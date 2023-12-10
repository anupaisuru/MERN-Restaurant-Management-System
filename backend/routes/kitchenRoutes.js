const express = require("express");
const router = express.Router();
const order = require("../models/order");

//get all pending order
router.get("/pending", async (req, res) => {
  try {
    const orders = await order.find({ orderStatus: "2" });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//get all complete order
router.get("/complete", async (req, res) => {
  try {
    const orders = await order.find({ orderStatus: "3" });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//order complate action
router.patch("/action/complete", async (req, res) => {
  const id = req.body.id;
  try {
    const filter = { _id: id };
    const update = { orderStatus: 3 };
    let orders = await order.findOneAndUpdate(filter, update);
    if (!orders) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "order complate successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//order cancel action
router.patch("/action/cancel", async (req, res) => {
  const id = req.body.id;
  try {
    const filter = { _id: id };
    const update = { orderStatus: 0 };
    let orders = await order.findOneAndUpdate(filter, update);
    if (!orders) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "order cancel successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//post add test order
router.post("/test", async (req, res) => {
  const {
    foodName,
    price,
    quantity,
    customername,
    customerid,
    orderType,
    orderStatus,
  } = req.body;
  const orders = new order({
    foodName,
    price,
    quantity,
    customername,
    customerid,
    orderType,
    orderStatus,
  });
  try {
    const newUser = await orders.save({
      foodName,
      price,
      quantity,
      customername,
      customerid,
      orderType,
      orderStatus,
    });
    res.json({ message: "order add Successfully" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

//get pending order count
router.get("/pending/count", async (req, res) => {
  try {
    const orders = await order.countDocuments({ orderStatus: "2" });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//get complete order count
router.get("/complete/count", async (req, res) => {
  try {
    const orders = await order.countDocuments({ orderStatus: "3" });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//get cancel order count
router.get("/cancel/count", async (req, res) => {
  try {
    const orders = await order.countDocuments({ orderStatus: "0" });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//get today complete order count
router.get("/complete/today", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);
    const orders = await order.countDocuments({
      orderStatus: "3",
      createdAt: { $gte: today, $lt: tomorrow },
    });
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
