import "./DeliveredOrder.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/images/logo.jpg";

function DeliveredOrder() {
    let title = "Delivered Orders";

    //Search
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    //Retrieve Data
    const [deliveredOrders, setDeliveredOrder] = useState([]);
    useEffect(() => {
        const fetchDeliveredOrders = async () => {
            const result = await axios.get(
                "http://localhost:5000/api/order/get/delivered"
            );
            setDeliveredOrder(result.data);
        };

        fetchDeliveredOrders();
    }, []);

    //Download PDF
    const handleDownload = () => {
        const doc = new jsPDF();
        const headers = [["Order Number", "Food Name", "Price", "Customer"]];

        const data = deliveredOrders.map((deliver, index) => [
            index + 1,
            deliver.foodName,
            deliver.price,
            deliver.customername,
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

        doc.text("Delivered Orders List", 85, 65);
        doc.setFontSize(9);
        doc.text("MealMatch Foods", 155, 30);
        doc.text("Colombo 07 127/4", 155, 35);
        doc.text("MealMatch@gmail.com", 155, 40);
        doc.text("0716775718", 155, 45);

        // Save the PDF with the filename
        doc.save("Delivered Orders.pdf");
        toast.success("Download!", { duration: 2000, position: "top-center" });
    };

    //Delete Data
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Confirm Deleting This Order?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#5E5BFF",
            confirmButtonText: "Yes, Delete!",
            customClass: {
                confirmButton: "button-spacing",
                cancelButton: "btton-spacing",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/api/order/delete/${id}`)
                    .then((response) => {
                        setDeliveredOrder(
                            deliveredOrders.filter((order) => order._id !== id)
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                    })

                    .catch((error) => {
                        console.error(error);
                    });
                Swal.fire("Deleted!", "The Order has been Deleted.", "success")
                    .then((result) => {
                        console.log("Deleted");
                    })

                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

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
                            <th>DRIVER</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveredOrders
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
                            .map((deliver, index) => (
                                <tr key={deliver.id}>
                                    <td>{index + 1}</td>
                                    <td>{deliver.foodName}</td>
                                    <td>{deliver.orderType}</td>
                                    <td>{deliver.customername}</td>
                                    <td>{deliver.price}</td>
                                    <td>Sunil</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-danger"
                                            onClick={() =>
                                                handleDelete(deliver._id)
                                            }
                                        >
                                            Delete
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

export default DeliveredOrder;
