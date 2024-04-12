import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateProduct from "./CreateProduct";

const UpdateProductModal = ({ show, setShow,updateData ,getALlProducts}) => {
  return (
    <>
      <Modal size="lg" show={show} onHide={() => setShow(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><CreateProduct getALlProducts={getALlProducts} updateData={updateData} isUpdate={true}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(null)}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
