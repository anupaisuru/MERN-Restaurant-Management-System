import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customerprofile.css";
import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
import Loader from "../../Components/loader/Loader";
import Error from "../../Components/error/Error";
import Swal from "sweetalert2";

function Customerprofile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    async function getUserDetails() {
      try {
        setloading(true);
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
          throw new Error("User not found in local storage");
        }
        const response = await axios.get(`/api/users/${user._id}`);
        const userData = response.data;
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setPhoneNumber(userData.phoneNumber || "");
        setAddress(userData.address || "");
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    }
    getUserDetails();
  }, []);

  async function changeUserDetails(
    firstName,
    lastName,
    email,
    phoneNumber,
    address
  ) {
    setloading(true);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      throw new Error("User not found in local storage");
    }

    const _id = currentUser._id;
    try {
      const res = (
        await axios.patch("/api/users/edituser", {
          _id,
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
        })
      ).data;

      console.log("User details updated successfully");

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          _id: currentUser._id,
          firstName: firstName ? firstName : currentUser.firstName,
          lastName: lastName ? lastName : currentUser.lastName,
          email: email ? email : currentUser.email,
          phoneNumber: phoneNumber ? phoneNumber : currentUser.phoneNumber,
          address: address ? address : currentUser.address,
        })
      );

      showSuccessMessage(); // Call the showSuccessMessage function
    } catch (error) {
      console.log(error);
      seterror(error);
    } finally {
      setloading(false);
    }
  }

  function showSuccessMessage() {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "User details updated successfully.",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload(); // Reload the page
      }
    });
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : (
        <>
          <div className="Customerprofile">
            <Header />
            <div className="cp-content">
              {/* first line */}
              <div className="cp-firstLine">
                <div className="FN">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </div>
                <div className="LN">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                </div>
              </div>
              {/* second line */}
              <div className="cp-secondLine">
                <div className="Em">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="Pn">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
              </div>
              {/* third line */}
              <div className="cp-thirdLine">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>

              <div className="cp-udBtn">
                <div className="cp-upd">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: "Do you want to update your user details?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          changeUserDetails(
                            firstName,
                            lastName,
                            email,
                            phoneNumber,
                            address
                          );
                        } else {
                          window.location.reload();
                        }
                      })
                    }
                    style={{ height: "57px", width: "345px" }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default Customerprofile;
