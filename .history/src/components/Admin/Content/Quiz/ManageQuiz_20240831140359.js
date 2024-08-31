import React from "react";

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
          <label for="floatingPassword">Password</label>
        </div>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
