import "./OrderDashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PendingActionsSharpIcon from "@mui/icons-material/PendingActionsSharp";
import LibraryAddCheckSharpIcon from "@mui/icons-material/LibraryAddCheckSharp";
import DeliveryDiningSharpIcon from "@mui/icons-material/DeliveryDiningSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

function OrderDashboard() {
    let title = "Order DashBoard";

    const [newCount, setNewCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);
    const [deliveringCount, setDeliveringCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [cancelCount, setCancelCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            const newCountResponse = await axios.get(
                "http://localhost:5000/api/order/get/order/count"
            );
            setNewCount(newCountResponse.data.count);

            const pendingCountResponse = await axios.get(
                "http://localhost:5000/api/order/get/pending/count"
             );
             setPendingCount(pendingCountResponse.data.count);

            const completeCountResponse = await axios.get(
                "http://localhost:5000/api/order/get/complete/count"
            );
            setCompleteCount(completeCountResponse.data.count);

            const deliveringCountResponse = await axios.get(
                "http://localhost:5000/api/order/get/delivering/count"
            );
            setDeliveringCount(deliveringCountResponse.data.count);

            const deliveredCountResponse = await axios.get(
                "http://localhost:5000/api/order/get/delivered/count" 
                    
            );
            setDeliveredCount(deliveredCountResponse.data.count);

            const cancelCountResponse = await axios.get(
                "http://localhost:5000/api/order/get/cancel/count"
            );
            setCancelCount(cancelCountResponse.data.count);
        };

        fetchCounts();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="top-container">
                <h3>{title}</h3>
                <Link to="/order/new">
                    <button type="button" class="btn btn-outline-warning">
                        New Order
                    </button>
                </Link>
            </div>

            <div className="bottom-container">
                {/* New Orders */}
                <div className="box">
                    <div
                        className="box-container"
                        style={{ border: "1px solid #0d47a1" }}
                    >
                        <div
                            className="box-left"
                            style={{ background: "#90caf9" }}
                        >
                            <ContentPasteIcon
                                style={{
                                    color: "#0d47a1",
                                    background: "#90caf9",
                                }}
                            />
                        </div>
                        <div className="box-right">
                            <span>New Orders</span>
                            <span>{newCount}</span>
                        </div>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="box">
                    <div
                        className="box-container"
                        style={{ border: "1px solid #ffa000" }}
                    >
                        <div
                            className="box-left"
                            style={{ background: "#ffe082" }}
                        >
                            <PendingActionsSharpIcon
                                style={{
                                    color: "#ffa000",
                                    background: "#ffe082",
                                }}
                            />
                        </div>
                        <div className="box-right">
                            <span>Pending Orders</span>
                            <span>{pendingCount}</span>
                        </div>
                    </div>
                </div>

                {/* Completed Orders */}
                <div className="box">
                    <div
                        className="box-container"
                        style={{ border: "1px solid #1b5e20" }}
                    >
                        <div
                            className="box-left"
                            style={{ background: "#a5d6a7" }}
                        >
                            <LibraryAddCheckSharpIcon
                                style={{
                                    color: "#1b5e20",
                                    background: "#a5d6a7",
                                }}
                            />
                        </div>
                        <div className="box-right">
                            <span>Complete Orders</span>
                            <span>{completeCount}</span>
                        </div>
                    </div>
                </div>

                {/* Delivering Orders */}
                <div className="box">
                    <div
                        className="box-container"
                        style={{ border: "1px solid #e91e63" }}
                    >
                        <div
                            className="box-left"
                            style={{ background: "#f8bbd0" }}
                        >
                            <DeliveryDiningSharpIcon
                                style={{
                                    color: "#e91e63",
                                    background: "#f8bbd0",
                                }}
                            />
                        </div>
                        <div className="box-right">
                            <span>Deliver Orders</span>
                            <span>{deliveringCount}</span>
                        </div>
                    </div>
                </div>

                {/* Delivered Orders */}
                <div className="box">
                    <div
                        className="box-container"
                        style={{ border: "1px solid #4a148c" }}
                    >
                        <div
                            className="box-left"
                            style={{ background: "#e1bee7" }}
                        >
                            <CheckBoxSharpIcon
                                style={{
                                    color: "#4a148c",
                                    background: "#e1bee7",
                                }}
                            />
                        </div>
                        <div className="box-right">
                            <span>Delivered Orders</span>
                            <span>{deliveredCount}</span>
                        </div>
                    </div>
                </div>

                {/* Cancel Orders */}
                <div className="box">
                    <div
                        className="box-container"
                        style={{ border: "1px solid #b71c1c" }}
                    >
                        <div
                            className="box-left"
                            style={{
                                background: "#ef9a9a",
                            }}
                        >
                            <CancelSharpIcon
                                style={{
                                    color: "#b71c1c",
                                    background: "#ef9a9a",
                                }}
                            />
                        </div>
                        <div className="box-right">
                            <span>Cancel Orders</span>
                            <span>{cancelCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDashboard;
