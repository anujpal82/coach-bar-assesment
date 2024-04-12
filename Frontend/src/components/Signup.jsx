import React, { useMemo } from "react";
import AuthApi from "../api/auth";
import { displayErrorToast, displaySuccessToast } from "../config/alert";
import { getToken } from "../config/helper";

const Signup = () => {
  const [signUpData, setSignUpData] = React.useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const token = useMemo(() => getToken(), []);
  const handleSubmit = () => {
    if (
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.name ||
      !signUpData.role
    ) {
      displayErrorToast("Please enter all fields");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(signUpData.email)) {
      displayErrorToast("Please enter a valid email");
    }
    AuthApi.Signup(signUpData, token)
      .then(() => {
        setSignUpData({
          email: "",
          password: "",
          name: "",
          role: "",
        });
        displaySuccessToast("User registered successfully");
      })
      .catch((err) => {
        displayErrorToast(err.response.data.error.message);
      });
  };
  const handleChange = (e, name) => {
    setSignUpData((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };
  return (
    <div className=" mt-3 d-flex justify-content-center align-items-center  ">
      <div className=" border border-secondary rounded p-5 w-50 shadow-lg">
        <form style={{ textAlign: "left" }}>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              Name
            </label>
            <input
            value={signUpData.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="Enter your name"
              type="name"
              id="form2Example1"
              className="form-control"
            />
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              Email address
            </label>
            <input
              onChange={(e) => handleChange(e, "email")}
              placeholder="Enter your email"
              type="email"
              id="form2Example1"
              className="form-control"
              value={signUpData.email}
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4 fw-bold">
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
            <input
              onChange={(e) => handleChange(e, "password")}
              placeholder="Enter your password"
              type="password"
              id="form2Example2"
              className="form-control"
              value={signUpData.password}
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              Role
            </label>
            <select
              onChange={(e) => handleChange(e, "role")}
              type="email"
              id="form2Example1"
              className="form-control"
              value={signUpData.role}
            >
              <option value="">Please select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block mb-4 w-100"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
