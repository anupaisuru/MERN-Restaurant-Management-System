const express = require('express');
const router = express.Router();
const Bill = require('../models/billInfo');

router.post('/bills', async (req, res) => {
    try {
      const bill = new Bill(req.body);
      const savedBill = await bill.save();
      res.status(201).json("saved successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send('not saved');
    }
  });

  module.exports = router;
