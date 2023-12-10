import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/loader/Loader";
import Error from "../../Components/error/Error";
import "./Login.css";

import BrandLogo from "../BrandLogo/BrandLogo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      return setError("Please enter email and password.");
    }

    try {
      setLoading(true);
      setShowLogin(false);
      const { data, status } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setLoading(false);
      setShowLogin(true);

      if (status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        window.location.href = "/menu";
      } else {
        setError("Invalid Credentials.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowLogin(true);
      setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
          <div className="login row ">
            {/* <Header /> */}
            <div className="login-content">
              <div className="login-content-wrapper">
                <div style={{ textAlign: "center" }}>
                  <BrandLogo />
                </div>
                <div>
                  <form className="left">
                    <h3>Log In</h3>
                    <div className="from-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="from-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <br />
                    <div className="from-group">
                      <button
                        type="submit"
                        className="btn-login"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </div>
                    <div className="reg-lin">
                      <p>
                        Not registered yet? Click here to{" "}
                        <Link to="/register">Register</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="right-login"></div> */}
            </div>
            <div className="right-login"></div>
            {/* <Footer /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
