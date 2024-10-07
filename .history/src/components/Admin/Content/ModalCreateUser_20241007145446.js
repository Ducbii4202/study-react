import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiService";

// ModalCreateUser component dùng để tạo người dùng mới
const ModalCreateUser = (props) => {
  const { show, setShow, setCurrentPage, fetchingUsersPaginate } = props;

  // Đóng Modal và đặt lại các state khi đóng
  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  // Khởi tạo state để lưu thông tin người dùng mới
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Hàm đặt lại các trường trong form
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  // Xử lý upload ảnh và hiển thị ảnh xem trước
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setPreviewImage("");
    }
  };

  // Hàm kiểm tra định dạng email hợp lệ
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // Xử lý khi người dùng nhấn nút "Save"
  const handleSubmitCreateUser = async () => {
    // Kiểm tra email hợp lệ
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Email không hợp lệ");
      return;
    }

    // Kiểm tra mật khẩu không được để trống
    if (!password) {
      toast.error("Mật khẩu không hợp lệ");
      return;
    }

    // Gửi yêu cầu tạo người dùng mới
    let data = await postCreateNewUser(email, password, username, role, image);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1); // Chuyển về trang đầu tiên sau khi thêm người dùng mới
      await fetchingUsersPaginate(1);
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Người Dùng Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            {/* Trường nhập Email */}
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Trường nhập Password */}
            <div className="col-md-6">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Trường nhập Username */}
            <div className="col-md-6">
              <label className="form-label">Tên Người Dùng</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Chọn Role của người dùng */}
            <div className="col-md-4">
              <label className="form-label">Vai trò</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            {/* Upload hình ảnh */}
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Tải lên hình ảnh
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
              <div className="col-md-12 img-preview">
                {previewImage ? (
                  <img src={previewImage} alt="preview" />
                ) : (
                  <span>Hình ảnh xem trước</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateUser}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
