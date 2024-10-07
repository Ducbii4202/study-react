import React from "react";
import "./ManageQuiz.scss";

const ManageQuiz = (props) => {
  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div> <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz:</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="your quiz name"
            />
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="description..."
            />
            <label for="floatingPassword">Description</label>
            <div className="more-action">
              <label>Upload Image</label>
              <input />
            </div>
          </div>
          <div className=""></div>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
