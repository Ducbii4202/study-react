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
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
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
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="description..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label for="floatingPassword">Description</label>
            <div className="my-3">
              <Select
                options={options}
                placeholder={"quiztype..."}
                value={type}
              />
            </div>
            <div className="more-action form-group">
              <label className="mb-1">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleChangeFile()}
              />
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-warning">Save</button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
