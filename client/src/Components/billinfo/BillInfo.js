import React, { useState } from "react";
import "./BillInfo.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function BillInfo() {
    const [fullName, setfullName] = useState("");
    const [deliveryAddress, setdeliveryAddress] = useState("");
    const [city, setcity] = useState("");
    const [email, setemail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [cardName, setcardName] = useState("");
    const [cardNumber, setcardNumber] = useState("");
    const [expMonth, setexpMonth] = useState("");
    const [expYear, setexpYear] = useState("");
    const [cvv, setcvv] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    function validateForm() {
        let errors = {};
        let isValid = true;

        if (!fullName.trim()) {
            isValid = false;
            errors["fullName"] = "Full name is required";
        }

        if (!deliveryAddress.trim()) {
            isValid = false;
            errors["deliveryAddress"] = "Delivery address is required";
        }

        if (!city.trim()) {
            isValid = false;
            errors["city"] = "City is required";
        }

        if (!email.trim()) {
            isValid = false;
            errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errors["email"] = "Invalid email address";
        }

        if (!phoneNumber.trim()) {
            isValid = false;
            errors["phoneNumber"] = "Phone number is required";
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            isValid = false;
            errors["phoneNumber"] = "Invalid phone number";
        }

        if (!cardName.trim()) {
            isValid = false;
            errors["cardName"] = "Card name is required";
        }

        if (!cardNumber.trim()) {
            isValid = false;
            errors["cardNumber"] = "Card number is required";
        } else if (!/^\d{4}-?\d{4}-?\d{4}-?\d{4}$/.test(cardNumber)) {
            isValid = false;
            errors["cardNumber"] = "Invalid card number";
        }

        if (!expMonth.trim()) {
            isValid = false;
            errors["expMonth"] = "Expiration month is required";
        } else {
            if (parseInt(expYear) < currentYear) {
                isValid = false;
                errors["expYear"] = "Expiration year must be in the future";
            } else if (
                parseInt(expYear) === currentYear &&
                parseInt(expMonth) < currentMonth
            ) {
                isValid = false;
                errors["expMonth"] = "Expiration month must be in the future";
            }
        }

        if (!cvv.trim()) {
            isValid = false;
            errors["cvv"] = "CVV is required";
        } else if (!/^\d{3}$/.test(cvv)) {
            isValid = false;
            errors["cvv"] = "Invalid CVV";
        }

        if (!expMonth.trim()) {
            isValid = false;
            errors["expMonth"] = "Expiration month and year are required";
        } else {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            const expiryMonth = parseInt(expMonth.split("-")[1]);
            const expiryYear = parseInt(expMonth.split("-")[0]);

            if (expiryYear < currentYear) {
                isValid = false;
                errors["expMonth"] = "Card has expired";
            } else if (
                expiryYear === currentYear &&
                expiryMonth < currentMonth
            ) {
                isValid = false;
                errors["expMonth"] = "Card has expired";
            }
        }

        setFormErrors(errors);

        return isValid;
    }

    async function pCheckout(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const bill = {
            fullName,
            deliveryAddress,
            city,
            email,
            phoneNumber,
            cardName,
            cardNumber,
            expMonth,
            cvv,
        };

        setfullName("");
        setdeliveryAddress("");
        setcity("");
        setemail("");
        setphoneNumber("");
        setcardName("");
        setcardNumber("");
        setexpMonth("");
        setcvv("");

        try {
            const result = await Swal.fire({
                title: "Confirm payment",
                text: "Are you sure you want to proceed with payment?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Pay",
                cancelButtonText: "Cancel",
            });

            if (result.isConfirmed) {
                const response = await fetch("/api/billInfo/bills", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bill),
                });

                if (response.ok) {
                    await Swal.fire({
                        title: "Payment success",
                        icon: "success",
                        text: "Your payment was successful!",
                    });
                    window.location.replace("/menu");
                } else {
                    console.error("Error saving bill");
                }
            }
        } catch (error) {
            console.error("Error saving bill", error);
        }
    }

    return (
        <div className="BillInfo">
            <Header />

            <div className="billinfo-content">
                <form className="bill-content">
                    <h3>Delivery Information</h3>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => {
                                setfullName(e.target.value);
                            }}
                            required
                        />
                        {formErrors["fullName"] && (
                            <span className="error">
                                {formErrors["fullName"]}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Delivery Address</label>
                        <input
                            type="text"
                            id="address"
                            value={deliveryAddress}
                            onChange={(e) => {
                                setdeliveryAddress(e.target.value);
                            }}
                            required
                        />
                        {formErrors["deliveryAddress"] && (
                            <span className="error">
                                {formErrors["deliveryAddress"]}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => {
                                setcity(e.target.value);
                            }}
                            required
                        />
                        {formErrors["city"] && (
                            <span className="error">{formErrors["city"]}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                        {formErrors["email"] && (
                            <span className="error">{formErrors["email"]}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => {
                                setphoneNumber(e.target.value);
                            }}
                            required
                        />
                        {formErrors["phoneNumber"] && (
                            <span className="error">
                                {formErrors["phoneNumber"]}
                            </span>
                        )}
                    </div>
                </form>
                <div className="payment-content">
                    <form className="left">
                        <h3>Payement Details</h3>
                        <div className="form-group">
                            <label>Name On Card</label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => {
                                    setcardName(e.target.value);
                                }}
                                required
                            />
                            {formErrors["cardName"] && (
                                <span className="error">
                                    {formErrors["cardName"]}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                value={cardNumber || ""}
                                onChange={(e) => {
                                    const inputCardNumber = e.target.value;
                                    const formattedCardNumber = inputCardNumber
                                        ? inputCardNumber
                                              .replace(/\D/g, "") // Remove all non-numeric characters
                                              .match(/.{1,4}/g) // Split into groups of four digits
                                              .join("-") // Join groups with a hyphen
                                        : null; // Set formatted card number to null if input is empty
                                    setcardNumber(formattedCardNumber);
                                }}
                            />

                            {formErrors["cardNumber"] && (
                                <span className="error">
                                    {formErrors["cardNumber"]}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Exp Month & Year</label>
                            <input
                                type="month"
                                value={expMonth}
                                onChange={(e) => {
                                    setexpMonth(e.target.value);
                                }}
                                required
                            />
                            {formErrors["expMonth"] && (
                                <span className="error">
                                    {formErrors["expMonth"]}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => {
                                    setcvv(e.target.value);
                                }}
                                pattern="\d{4}"
                                required
                            />
                            {formErrors["cvv"] && (
                                <span className="error">
                                    {formErrors["cvv"]}
                                </span>
                            )}
                        </div>
                        <br></br>
                        <div className="form-group">
                            <Link to="/menu">
                                <button
                                    type="submit"
                                    className="btn2-payment"
                                    onClick={pCheckout}
                                >
                                    Proceed To Checkout
                                </button>
                            </Link>
                        </div>
                        <div className="form-group">
                            <Link to="/menu">
                                <button type="submit" className="btn3-payment">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default BillInfo;
