import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./Pizza.css";

export default function Pizza({pizza}) {
    const [quantity, setQuantity] = useState(0);
    const [varient, setVarient] = useState("none");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleshow = () => setShow(true);

    return (
        <div
            style={{ margin: "30px" }}
            className="shadow-lg p-3 mb-5 bg-white rounded hmenu"
        >
            <div onClick={handleshow} style={{ textAlign: "center" }}>
                <h1 className="uppercase">{pizza.name}</h1>
                <img
                    src={pizza.image}
                    className="img-fluid food-image"
                    alt="Food Preview"
                />
            </div>
            <div className="flex-container mt-1">
                <div className="w-100 m-1">
                    {/* <p>Varients</p> */}

                    <select className='form-select height' value={varient} onChange={(e) => { setVarient(e.target.value) }}>
                        <option value='none' disabled={true}>Select Varient</option>



                        {pizza.varients.map((varient, i) => {
                            return (
                                <option key={i} value={varient.toLowerCase()}>
                                    {varient}{" "}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="w-100 m-1">
                    {/* <p>Quantity</p> */}
                    <input
                        className="form-control"
                        type="number"
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                        value={quantity}
                        placeholder="Quantity"
                        min="0"
                    />
                </div>
            </div>
            <div className="flex-container">
                <div className="m-1 w-100">
                    <h1 className="mt-2">
                        Price : Rs{" "}
                        {varient === "none"
                            ? 0
                            : pizza.prices[varient] * quantity}
                    </h1>
                </div>
            </div>
            <div className="m-1 w-100">
                <button
                    className="btn-red btn uppercase w-100"
                >
                    Add to cart
                </button>
            </div>

            <Modal show={show} onHide={handleClose} className='hmenu'>
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <img
                        src={pizza.image}
                        className="img-fluid"
                        style={{ height: "400px" }}
                        alt="Modal Food Preview"
                    />
                    <p>{pizza.description}</p>
                </Modal.Body>

                <Modal.Footer>

                    <button className="btn btn-red" onClick={handleClose}>CLOSE</button>


                </Modal.Footer>
            </Modal>
        </div>
    );
}
