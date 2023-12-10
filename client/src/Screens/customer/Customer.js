import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import Loader from "../../Components/loader/Loader";
import Error from "../../Components/error/Error";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/images/logo.jpg";

function Customer() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setloading(true);
        const res = await axios.get("/api/users/getallusers");
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    }
    fetchUsers();
  }, []);

  const handleAUpdate = async (_id) => {
    Swal.fire({
      title: "Confirm changing user's access to Admin?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch("/api/users/changeadmin", { _id });
          Swal.fire(
            "Access Updated",
            "User's access has been updated to Admin",
            "success"
          ).then((result) => {
            window.location.reload();
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Confirm deleting this user?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch("/api/users/deleteuser", { _id });
          Swal.fire("Deleted!", "The user has been deleted.", "success").then(
            (result) => {
              window.location.reload();
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
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
      title: "Manager Access",
      key: "action",
      render: (_, record) => (
        <Button
          className="btn btn-primary"
          onClick={() => handleAUpdate(record._id)}
        >
          Update
        </Button>
      ),
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          className="btn btn-danger"
          onClick={() => handleDelete(record._id)}
        >
          Delete
        </Button>
      ),
      align: "center",
    },
  ];

  const handleSearchArea = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredUsers = users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(searchQuery) ||
        user.lastName.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery) ||
        user.phoneNumber.toLowerCase().includes(searchQuery) ||
        user.address.toLowerCase().includes(searchQuery)
      );
    });
    setFilteredUsers(filteredUsers);
  };

  const handleCDownload = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the table headers
    const headers = [["Name", "Email", "Phone Number", "Address"]];

    // Map the admin data to table rows
    const data = users.map((user) => [
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.phoneNumber,
      user.address,
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

    doc.text("Customer List", 85, 65);
    doc.setFontSize(9);
    doc.text("MealMatch Foods", 155, 30);
    doc.text("Colombo 07 127/4", 155, 35);
    doc.text("MealMatch@gmail.com", 155, 40);
    doc.text("0716775718", 155, 45);

    // Save the PDF with the filename "subadmin-list.pdf"
    doc.save("customer-list.pdf");
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
                className="btn btn-warning pdf-button"
                onClick={handleCDownload}
              >
                PDF
              </button>
            </div>
          </div>
          <div className="Subadmin-list col-md-12">
            <div style={{ marginTop: "20px" }}>
              <Table
                dataSource={filteredUsers}
                columns={columns}
                pagination={{ pageSize: 5 }}
                footer={() => (
                  <div className="footer-number">{`Total ${users.length} items`}</div>
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Customer;
