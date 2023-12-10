import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import Loader from "../../Components/loader/Loader";
import Error from "../../Components/error/Error";
import "./Subadmin.css";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/images/logo.jpg";

function Subadmin() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await axios.get("/api/users/getalladmins");
        setAdmins(response.data.admins);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Confirm deleting this user?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch("/api/users/deleteuser", { _id })
          .then((res) => {
            setAdmins(admins.filter((admin) => admin._id !== _id));
            setFilteredAdmins(
              filteredAdmins.filter((admin) => admin._id !== _id)
            );
            Swal.fire("Deleted!", "The user has been deleted.", "success").then(
              (result) => {
                window.location.reload();
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      align: "center",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record._id !== currentUser._id ? (
          <Button
            className="btn btn-danger"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        ) : null,
      align: "center",
    },
  ];

  const handleSearchArea = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredAdmins = admins.filter((admin) => {
      return (
        admin.firstName.toLowerCase().includes(searchQuery) ||
        admin.lastName.toLowerCase().includes(searchQuery) ||
        admin.email.toLowerCase().includes(searchQuery) ||
        admin.phoneNumber.toLowerCase().includes(searchQuery) ||
        admin.address.toLowerCase().includes(searchQuery)
      );
    });
    setFilteredAdmins(filteredAdmins);
  };

  const handleADownload = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the table headers
    const headers = [["Name", "Email", "Phone Number", "Address"]];

    // Map the admin data to table rows

    const data = admins.map((admin) => [
      `${admin.firstName} ${admin.lastName}`,
      admin.email,
      admin.phoneNumber,
      admin.address,
    ]);

    // Set the table styles
    const styles = {
      halign: "center",
      valign: "middle",
      fontSize: 10,
    };

    // Add the table to the PDF document
    doc.autoTable({
      head: headers,
      body: data,
      styles,
      margin: { top: 70 },
    });

    doc.addImage(logo, "JPEG", 10, 10, 65, 50);

    doc.text("Managers List", 85, 65);
    doc.setFontSize(9);
    doc.text("MealMatch Foods", 155, 30);
    doc.text("Colombo 07 127/4", 155, 35);
    doc.text("MealMatch@gmail.com", 155, 40);
    doc.text("0716775718", 155, 45);

    // Save the PDF with the filename "subadmin-list.pdf"
    doc.save("Manager-List.pdf");
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : (
        <>
          <div className="sp">
            <div>
              <input
                className="form-control search-box"
                type="search"
                placeholder="search"
                name="searchQuery"
                onChange={handleSearchArea}
              ></input>
            </div>

            <div>
              <button
                className=" btn btn-warning pdf-button"
                onClick={handleADownload}
              >
                PDF
              </button>
            </div>
          </div>
          <div style={{ marginTop: "" }}>
            <div className="Subadmin-list col-md-12">
              <Table
                style={{ marginTop: "20px" }}
                dataSource={filteredAdmins.length > 0 ? filteredAdmins : admins}
                columns={columns}
                pagination={{ pageSize: 5 }}
                footer={() => (
                  <div className="footer-number">{`Total ${admins.length} items`}</div>
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Subadmin;
