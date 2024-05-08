import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const AppModal = ({ children, show, handleClose, title, size }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        <button className="btn btn-default" onClick={handleClose}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default AppModal;
