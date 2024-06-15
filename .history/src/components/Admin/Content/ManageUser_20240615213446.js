import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState();
  return (
    <div className="manage-user-container">
      <div className="title">Magane User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary">
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">table user</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
