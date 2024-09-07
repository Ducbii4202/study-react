import React, { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";

const options = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState("Easy");
  const [image, setImage] = useState(null);
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
            <div className="my-3">
              <Select options={options} placeholder={"quiztype..."} />
            </div>
            <div className="more-action form-group">
              <label className="mb-1">Upload Image</label>
              <input type="file" className="form-control" />
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
