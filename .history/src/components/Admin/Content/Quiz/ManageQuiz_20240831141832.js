import React from "react";
import "./ManageQuiz.scss";

const ManageQuiz = (props) => {
  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <div className="add-new">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
        </div>
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz:</legend>

          <label for="floatingPassword">Password</label>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
