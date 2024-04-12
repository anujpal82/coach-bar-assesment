import React from "react";
import AuthApi from "../api/auth";
import { displayErrorToast, displaySuccessToast } from "../config/alert";

const SignIn = () => {
  const [loginData, setLoginData] = React.useState({ email: "", password: "" });
  const handleChange = (e, name) => {
    setLoginData({ ...loginData, [name]: e.target.value });
  };
  const handleSubmit = () => {
    if (!loginData.email || !loginData.password) {
      displayErrorToast('Please enter email and password')
      return;
    } else {
      AuthApi.Login(loginData)
        .then((res) => {
          localStorage.setItem("token", res?.data?.data?.token);
          localStorage.setItem("user", JSON.stringify(res.data?.data?.user));
          displaySuccessToast("User logged in successfully");
          window.location.href = "/";
        })
        .catch((err) => {
          displayErrorToast(err.response.data.error.message);
        });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 shadow-lg">
      <div className="mt-5 border border-secondary rounded p-5 w-25">
        <form style={{ textAlign: "left" }}>
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
            />
          </div>


          <button
            type="button"
            className=" mt-3 btn btn-primary btn-block mb-4 w-100"
            onClick={handleSubmit}
          >
            Sign in
          </button>

         
        </form>
      </div>
    </div>
  );
};

export default SignIn;
