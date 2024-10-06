import React, { useState } from "react";
import "./Login.scss"; // Import file CSS cho component Login
import { useNavigate } from "react-router-dom"; // Hook điều hướng cho các trang trong React Router
import { postLogin } from "../../services/apiService"; // Hàm gọi API đăng nhập từ service
import { toast } from "react-toastify"; // Thư viện thông báo Toast
import { VscEye, VscEyeClosed } from "react-icons/vsc"; // Icon mắt dùng để hiển thị ẩn/hiện mật khẩu
import { useDispatch } from "react-redux"; // Hook sử dụng dispatch để kích hoạt action trong Redux
import { doLogin } from "../../redux/action/userAction"; // Action Redux để xử lý đăng nhập
import { ImSpinner9 } from "react-icons/im"; // Icon spinner dùng để hiển thị trạng thái loading

const Login = (props) => {
  // Khai báo state để lưu trữ email và mật khẩu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook điều hướng trang
  const navigate = useNavigate();

  // Sử dụng dispatch để gọi các action trong Redux
  const dispatch = useDispatch();

  // Khai báo state để quản lý trạng thái loading và hiển thị mật khẩu
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  /**
   * Hàm validateEmail
   * Kiểm tra xem email có hợp lệ hay không.
   * @param {string} email - Email cần kiểm tra.
   * @returns {boolean} - Kết quả true/false xác định tính hợp lệ của email.
   */
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // Biểu thức regex kiểm tra email
      );
  };

  /**
   * Hàm handleLogin
   * Xử lý logic đăng nhập khi người dùng nhấn vào nút "Login".
   * 1. Validate email và mật khẩu.
   * 2. Gọi API đăng nhập.
   * 3. Hiển thị thông báo Toast dựa trên kết quả trả về.
   */
  const handleLogin = async () => {
    // 1. Kiểm tra email có hợp lệ không
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email"); // Thông báo lỗi nếu email không hợp lệ
      return;
    }

    // 2. Kiểm tra xem mật khẩu có được nhập hay không
    if (!password) {
      toast.error("Invalid password"); // Thông báo lỗi nếu mật khẩu trống
      return;
    }

    // 3. Hiển thị trạng thái loading khi gửi request
    setIsLoading(true);

    // 4. Gọi API đăng nhập từ service
    let data = await postLogin(email, password);

    // 5. Kiểm tra kết quả trả về của API
    if (data && +data.EC === 0) {
      // Nếu đăng nhập thành công
      dispatch(doLogin(data)); // Gọi action Redux để lưu trữ thông tin người dùng
      toast.success(data.EM); // Hiển thị thông báo thành công
      setIsLoading(false); // Tắt trạng thái loading
      navigate("/"); // Chuyển hướng về trang chủ
    }
    if (data && +data.EC !== 0) {
      // Nếu đăng nhập thất bại
      toast.error(data.EM); // Hiển thị thông báo lỗi
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <div className="login-container">
      {/* Header của form login */}
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>

      {/* Tiêu đề và nội dung chào mừng */}
      <div className="title col-4 mx-auto">Wordaholic</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>

      {/* Form nội dung */}
      <div className="content-form col-4 mx-auto">
        {/* Nhập email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Cập nhật state email khi người dùng nhập
          />
        </div>

        {/* Nhập mật khẩu */}
        <div className="form-group pass-group">
          <label>Password (*)</label>
          {/* Kiểm tra xem có hiển thị mật khẩu không */}
          <input
            type={isShowPassword ? "text" : "password"} // Chọn kiểu input là text hoặc password
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cập nhật state password khi người dùng nhập
          />
          {/* Icon ẩn/hiện mật khẩu */}
          {isShowPassword ? (
            <span
              className="incon-eye"
              onClick={() => setIsShowPassword(false)} // Đổi sang trạng thái ẩn mật khẩu
            >
              <VscEye />
            </span>
          ) : (
            <span className="incon-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>

        {/* Liên kết quên mật khẩu */}
        <span className="forgot-password">Forgot Password ?</span>

        {/* Nút đăng nhập */}
        <div>
          <button
            className="btn-submit"
            onClick={() => handleLogin()} // Gọi hàm xử lý đăng nhập
            disabled={isLoading} // Vô hiệu hóa nút khi đang gửi request
          >
            {/* Hiển thị icon loading khi đang gửi request */}
            {isLoading === true && <ImSpinner9 className="loader-icon" />}
            <span>Login</span>
          </button>
        </div>

        {/* Nút quay lại trang chủ */}
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/"); // Điều hướng về trang chủ
            }}
          >
            &#60;&#60; Go to HomePage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
