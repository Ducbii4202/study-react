import React from "react";
import "./ManageQuiz.scss";

const ManageQuiz = (props) => {
  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div> <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz:</legend>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" />
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" />
            <label for="floatingPassword">Description</label>
          </div>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
