const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        foodName: {
            type: String,
            required: true,
        },
        unitPrice: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        customername: {
            type: String,
            required: true,
        },
        customerid: {
            type: String,
            required: true,
        },
        orderType: {
            type: String,
            required: true,
        },
        telephone: {
            type: String,
            required: true
        },
        orderStatus: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = mongoose.model("orders", orderSchema);
