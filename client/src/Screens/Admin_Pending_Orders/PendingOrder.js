import "./PendingOrder.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

function PendingOrder() {
    let title = "Pending Orders";

  //Search
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
      setSearch(event.target.value);
  };

  //Retrieve Data
  const [pendingOrders, setPendingOrder] = useState([]);
  useEffect(() => {
      const fetchPendingOrders = async () => {
          const result = await axios.get(
              "http://localhost:5000/api/order/get/pending"
          );
          setPendingOrder(result.data);
      };

      fetchPendingOrders();
  }, []);

  //Download PDF
  const handleDownload = () => {
      const doc = new jsPDF();
      const headers = [["Order Number", "Food Name", "Price", "Customer"]];

      const data = pendingOrders.map((pending, index) => [
          index + 1,
          pending.foodName,
          pending.price,
          pending.customername,
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

      doc.text("Pending Orders List", 85, 65);
      doc.setFontSize(9);
      doc.text("MealMatch Foods", 155, 30);
      doc.text("Colombo 07 127/4", 155, 35);
      doc.text("MealMatch@gmail.com", 155, 40);
      doc.text("0716775718", 155, 45);

      // Save the PDF with the filename
      doc.save("Pending Orders.pdf");
      toast.success("Download!", { duration: 2000, position: "top-center" });
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
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingOrders
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
                            .map((pending, index) => (
                                <tr key={pending.id}>
                                    <td>{index + 1}</td>
                                    <td>{pending.foodName}</td>
                                    <td>{pending.orderType}</td>
                                    <td>{pending.customername}</td>
                                    <td>{pending.price}</td>
                                    <td
                                        style={{
                                            padding: "15px 0",
                                            position: "relative",
                                            bottom: "5px",
                                        }}
                                    >
                                        <span class="badge text-bg-warning">
                                            Preparing
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PendingOrder;
