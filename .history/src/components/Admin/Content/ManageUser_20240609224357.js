import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select">
                <option selected value="USERS">
                  Users
                </option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Image</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Magane User</div>
      <div className="user-content">
        <div>
          <button>Add new users</button>
        </div>
        <div>
          table user
          <Example />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
