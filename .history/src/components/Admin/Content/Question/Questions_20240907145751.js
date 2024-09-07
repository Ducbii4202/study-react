import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsCloudPlus } from "react-icons/bs";

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
        <div className="questions-content">
          <div class="form-floating description">
            <input
              type="type"
              class="form-control"
              placeholder="name@example.com"
            />
            <label>Description</label>
          </div>
          <div className="group-upload">
            <label className="label-up">Upload image</label>
            <input type={"file"} hidden />
            <span>myImage.png</span>
          </div>
          <div className="btn-add">
            <span>
              <BsCloudPlus />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
