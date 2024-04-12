import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductApi from "../api/product";
import { getToken, getUser } from "../config/helper";
import { displayErrorToast, displaySuccessToast } from "../config/alert";

const Products = ({ products, setShow, setUpdateData }) => {
  const handleEdit = (p) => {
    setShow(p?._id);
    setUpdateData(p);
  };

  const handleDelete = (p) => {
    ProductApi.deleteProduct(p?._id, getToken())
      .then(() => {
        displaySuccessToast("Product deleted successfully");
      })
      .catch((err) => {
        displayErrorToast(err.response.data.error.message);
      });
  };
  return (
    <>
      <Row className="mt-5  border-bottom py-3">
        <Col xs={1}>
          <h6>#</h6>
        </Col>
        <Col xs={1}>
          <h6>LOGO</h6>
        </Col>
        <Col xs={2}>
          <h6>NAME</h6>
        </Col>
        <Col xs={1}>
          <h6>SKU</h6>
        </Col>
        <Col xs={1}>
          <h6>Category</h6>
        </Col>
        <Col xs={getUser()?.role === "admin"?3:4}>
          <h6>DESCRIPTION</h6>{" "}
        </Col>
     
        <Col xs={2}>
          <h6>SOURCE</h6>{" "}
        </Col>
        <Col xs={1}>
          <h6>Actions</h6>
        </Col>
      </Row>

      {products?.map((p, index) => {
        return (
          <Row className=" border-bottom  py-2" key={p?._id}>
            <Col xs={1}>{index + 1}</Col>
            <Col xs={1}>
              <img
                height={50}
                width={50}
                src={p?.logo}
                className="rounded-3"
                alt="Avatar"
              />
            </Col>
            <Col xs={2}>{p?.name}</Col>
            <Col xs={1}>{p?.SKU}</Col>
            <Col xs={1}>{p?.category}</Col>
            <Col xs={getUser()?.role === "admin"?3:4}>{p?.description}</Col>
            <Col xs={2}>{p?.source}</Col>
            {getUser()?.role === "admin" && (
              <Col
                className="d-flex justify-content-between items-align-center 
            "
                xs={1}
              >
                <div onClick={() => handleEdit(p)}>
                  <FaEdit />
                </div>
                <div className="me-2" onClick={() => handleDelete(p)}>
                  <MdDelete />
                </div>
              </Col>
            )}
          </Row>
        );
      })}
    </>
  );
};

export default Products;
