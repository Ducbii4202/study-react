import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Magane User</div>
      <div className="user-content">
        <div>
          <button>Add new users</button>
        </div>
        <div>table user</div>
      </div>
    </div>
  );
};

export default ManageUser;

function StaticExample() {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
