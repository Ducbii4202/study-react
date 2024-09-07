import React, { useState } from "react";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([
    {
      id: 12,
      username: "ACA",
      email: "thanhndse16166cS8@fpt.edu.vn",
      role: "User",
    },
    {
      id: 12,
      username: "ACA",
      email: "thanhndse16166cS8@fpt.edu.vn",
      role: "User",
    },
  ]);

  return (
    <>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
