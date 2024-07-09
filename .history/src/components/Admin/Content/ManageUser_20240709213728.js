import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
// import TableUser from "./TableUser";
import { getAllUser, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = (props) => {
  const LimitUSer = 6;

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [listUser, setListUser] = useState([]);
  //componentDidMount
  useEffect(() => {
    // fetchingUsers();
    fetchingUsersPaginate(1);
  }, []);

  const fetchingUsers = async () => {
    let res = await getAllUser();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const fetchingUsersPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LimitUSer);
    if (res.EC === 0) {
      setListUser(res.DT.users);
    }
  };

  const hanldeClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  };

  const hanldeClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Magane User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUser={listUser}
            hanldeClickBtnUpdate={hanldeClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            hanldeClickBtnDelete={hanldeClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUser={listUser}
            hanldeClickBtnUpdate={hanldeClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            hanldeClickBtnDelete={hanldeClickBtnDelete}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchingUsers={fetchingUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchingUsers={fetchingUsers}
          resetUpdateData={resetUpdateData}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUpdate={dataUpdate}
          fetchingUsers={fetchingUsers}
          resetUpdateData={resetUpdateData}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchingUsers={fetchingUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
