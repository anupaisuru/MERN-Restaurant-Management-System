import "./CompleteOrder.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { Toaster, toast } from "react-hot-toast";
import logo from "../../assets/images/logo.jpg";

function OrderComplete() {
    let title = "Completed Orders";

    //Search
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    //Retrieve Data
    const [completeOrders, setCompleteOrders] = useState([]);
    useEffect(() => {
        const fetchCompleteOrders = async () => {
            const result = await axios.get(
                "http://localhost:5000/api/order/get/complete"
            );
            setCompleteOrders(result.data);
        };

        fetchCompleteOrders();
    }, []);

    //Download PDF
    const handleDownload = () => {
        const doc = new jsPDF();
        const headers = [["Order Number", "Food Name", "Price", "Customer"]];

        const data = completeOrders.map((complete, index) => [
            index + 1,
            complete.foodName,
            complete.price,
            complete.customername,
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

        doc.text("Complete Orders List", 85, 65);
        doc.setFontSize(9);
        doc.text("MealMatch Foods", 155, 30);
        doc.text("Colombo 07 127/4", 155, 35);
        doc.text("MealMatch@gmail.com", 155, 40);
        doc.text("0716775718", 155, 45);

        // Save the PDF with the filename
        doc.save("Complete Orders.pdf");
        toast.success("Download!", { duration: 2000, position: "top-center" });
    };

    //Change Order Status
    const handleOrderStatus = async (id) => {
        try {
            await axios.put(
                `http://localhost:5000/api/order/update/delivering/${id}`
            );
            setTimeout(() => {
                window.location.reload();
            }, 500);
            toast.success("Assigned!", {
                duration: 2000,
                position: "top-center",
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="common-container">
                <Toaster />
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
                    <thead className="table-header">
                        <tr>
                            <th>#</th>
                            <th>ITEMS</th>
                            <th>TYPE</th>
                            <th>CUSTOMER</th>
                            <th>TOTAL</th>
                            <th>DRIVER</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completeOrders
                            .filter((order) => {
                                return search.toLowerCase() === ""
                                    ? order
                                    : order.foodName
                                          .toLowerCase()
                                          .includes(search) ||
                                        order.customername
                                              .toLowerCase()
                                              .includes(search) ||
                                        order.orderType
                                              .toLowerCase()
                                              .includes(search),
                                        order._id
                                                .toLowerCase()
                                                .includes(search);
                            })
                            .map((complete, index) => (
                                <tr key={complete._id}>
                                    <td>{index + 1}</td>
                                    <td>{complete.foodName}</td>
                                    <td>{complete.orderType}</td>
                                    <td>{complete.customername}</td>
                                    <td>{complete.price}</td>
                                    <td>Sunil</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            onClick={() => {
                                                handleOrderStatus(complete._id);
                                            }}
                                        >
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderComplete;
