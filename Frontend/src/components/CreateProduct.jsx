import React, { useEffect, useMemo } from "react";

import ProductApi from "../api/product";
import { displayErrorToast, displaySuccessToast } from "../config/alert";
import Select from "react-select";

import { getToken } from "../config/helper";
const CreateProduct = ({ isUpdate, updateData, getALlProducts }) => {
  console.log({ getALlProducts });
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const loggedUser = useMemo(
    () => JSON.parse(localStorage.getItem("user")),
    []
  );
  const [createProductData, setCreateProductData] = React.useState({
    name: "",
    SKU: "",
    description: "",
    category: "",
    logo: "",
    users,
  });
  useEffect(() => {
    if (loggedUser?.role === "admin") {
      ProductApi.getUsers(getToken())
        .then((res) => {
          setUsers(res?.data?.data);
        })
        .catch((err) => {
          displayErrorToast(err.response.data.error.message);
        });
    }
  }, []);

  useEffect(() => {
    if (isUpdate && updateData && users) {
      const selecteUsers = updateData?.users?.map((id) => {
        return users?.find((u) => u.value === id);
      });
      setCreateProductData(updateData);
      setSelectedUsers(selecteUsers);
    } else {
      setCreateProductData({
        name: "",
        SKU: "",
        description: "",
        category: "",
        logo: "",
        users,
      });
    }
  }, [isUpdate, updateData, users]);

  const handleUserChange = (selectedUsers) => {
    setSelectedUsers(selectedUsers);
  };
  const token = useMemo(() => getToken(), []);
  const handleSubmit = () => {
    if (
      !createProductData.name ||
      !createProductData.SKU ||
      !createProductData.description ||
      !createProductData.category ||
      !createProductData.logo
    ) {
      displayErrorToast("Please enter all fields");
      return;
    }
    if (isUpdate) {
      ProductApi.updateProduct(
        { ...createProductData, users: selectedUsers?.map((v) => v?.value) },
        token
      )
        .then(() => {
          displaySuccessToast("Product updated successfully");
          if (getALlProducts) {
            console.log("hello");
            getALlProducts("");
          }
          else{
            console.log('not found');
          }
        })
        .catch((err) => {
          displayErrorToast(err?.response?.data?.error?.message);
        });
    } else {
      ProductApi.createProduct(
        { ...createProductData, users: selectedUsers?.map((v) => v?.value) },
        token
      )
        .then(() => {
          setCreateProductData({
            name: "",
            SKU: "",
            description: "",
            category: "",
            logo: "",
            users: [],
          });
          setSelectedUsers([]);
          displaySuccessToast("Product created successfully");
          getALlProducts("");
        })
        .catch((err) => {
          displayErrorToast(err?.response?.data?.error?.message);
        });
    }
  };
  const handleChange = (e, name) => {
    setCreateProductData((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };
  return (
    <div className=" mt-3 d-flex justify-content-center align-items-center  ">
      <div
        className={` border border-secondary rounded p-5 ${
          isUpdate ? "w-75 " : "w-50 shadow-lg"
        } `}
      >
        <form style={{ textAlign: "left" }}>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              Name
            </label>
            <input
              value={createProductData.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="Enter product  name"
              type="name"
              id="form2Example1"
              className="form-control"
            />
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              SKU
            </label>
            <input
              onChange={(e) => handleChange(e, "SKU")}
              placeholder="Enter SKU of product"
              type="text"
              id="form2Example1"
              className="form-control"
              value={createProductData.SKU}
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              Description
            </label>
            <input
              onChange={(e) => handleChange(e, "description")}
              placeholder="Enter description of product"
              type="text"
              id="form2Example1"
              className="form-control"
              value={createProductData.description}
            />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              Category
            </label>
            <select
              onChange={(e) => handleChange(e, "category")}
              placeholder="Enter SKU of product"
              type="text"
              id="form2Example1"
              className="form-control"
              value={createProductData.category}
            >
              <option value="">Please select category</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label fw-bold" htmlFor="form2Example1">
              Logo
            </label>
            <input
              onChange={(e) => handleChange(e, "logo")}
              placeholder="Enter logo link of product"
              type="text"
              id="form2Example1"
              className="form-control"
              value={createProductData.logo}
            />
          </div>
          {loggedUser?.role === "admin" && (
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label fw-bold" htmlFor="form2Example1">
                Assign Users
              </label>
              <Select
                isMulti
                options={users}
                onChange={handleUserChange}
                value={selectedUsers}
              />
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary btn-block mb-4 w-100"
            onClick={handleSubmit}
          >
            {isUpdate ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
