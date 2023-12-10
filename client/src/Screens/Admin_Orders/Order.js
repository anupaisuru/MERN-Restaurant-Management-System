import "./Order.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import logo from "../../assets/images/logo.jpg";
import Swal from "sweetalert2";

function OrderDashBoard() {
    let title = "Orders";

    //Search
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    //Retrieve Data
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            const result = await axios.get(
                "http://localhost:5000/api/order/get/order"
            );
            setOrders(result.data);
        };

        fetchOrders();
    }, []);

    //Download PDF
    const handleDownload = () => {
        const doc = new jsPDF();
        const headers = [["Order Number", "Food Name", "Price", "Customer"]];

        const data = orders.map((order, index) => [
            index + 1,
            order.foodName,
            order.price,
            order.customername,
        ]);

        const styles = {
            halign: "left",
            valign: "middle",
            fontSize: 11,
            cellPadding: 4,
        };

        doc.autoTable({
            head: headers,
            body: data,
            styles,
            margin: { top: 70 },
        });

        doc.addImage(logo, "JPEG", 10, 10, 65, 50);

        doc.text("New Orders List", 85, 65);
        doc.setFontSize(9);
        doc.text("MealMatch Foods", 155, 30);
        doc.text("Colombo 07 127/4", 155, 35);
        doc.text("MealMatch@gmail.com", 155, 40);
        doc.text("0716775718", 155, 45);

        // Save the PDF with the filename
        doc.save("Orders.pdf");
        toast.success("Download!", { duration: 2000, position: "top-center" });
    };

    //Change Order Status
    const handleOrderStatus = async (id) => {
        try {
            await axios.put(
                `http://localhost:5000/api/order/update/pending/${id}`
            );
            Swal.fire({
                icon: "success",
                title: "Order Accepted",
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error(error);
        }
    };

    //Move to Update Page
    

    return (
        <div className="order-dashboard-container">
            <Toaster />
            <div className="common-container">
                <div className="left-container">
                    <h3>{title}</h3>
                    <Link to="/order/new">
                        <button type="button" class="btn btn-outline-warning">
                            New Order
                        </button>
                    </Link>
                </div>

                <div className="right-container">
                    <div className="search">
                        <input
                            className="search-box"
                            type="search"
                            placeholder="search"
                            name="searchQuery"
                            onChange={handleSearch}
                        ></input>
                    </div>

                    <div className="pdf">
                        <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={handleDownload}
                        >
                            PDF
                        </button>
                    </div>
                </div>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ITEMS</th>
                            <th>TYPE</th>
                            <th>CUSTOMER</th>
                            <th>TOTAL</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders
                            .filter((order) => {
                                return search.toLowerCase() === ""
                                    ? order
                                    : order.foodName
                                          .toLowerCase()
                                          .includes(search) ||
                                          order.customername
                                              .toLowerCase()
                                              .includes(search) ||
                                          order._id
                                              .toLowerCase()
                                              .includes(search);
                            })
                            .map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.foodName}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.customername}</td>
                                    <td>{order.price}</td>
                                    <td>
                                        <div className="action-update">
                                            <button
                                                id="action-btn"
                                                type="button"
                                                class="btn btn-success"
                                                onClick={() => {
                                                    handleOrderStatus(
                                                        order._id
                                                    );
                                                }}
                                            >
                                                Accept
                                            </button>

                                            <Link
                                                to={`/order/update/${order._id}`}
                                            >
                                                <button
                                                    type="button"
                                                    class="btn btn-warning"
                                                    style={{marginLeft: "12px"}}
                                                >
                                                    Edit
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDashBoard;
