import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-questions">
        <div className="col-6 from-group">
          <label>Select Quiz</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add questions:</div>
        <div className="mt-3 row">
          <div class="form-floating mb-3 col-6">
            <input
              type="type"
              class="form-control"
              placeholder="name@example.com"
            />
            <label>Description</label>
          </div>
          <div className="col-3">
            <label>Upload image</label>
            <input type={"file"} />
          </div>
          <div className="col-3">
            <button>Add new</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
