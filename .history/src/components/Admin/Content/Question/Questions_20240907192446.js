import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsCloudPlus, BsCloudMinusFill } from "react-icons/bs";
import { FaRegCalendarMinus, FaRegCalendarPlus } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";

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
        <div>
          <div className="questions-content">
            <div className="form-floating description">
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
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <BsCloudPlus className="icon-add" />
              </span>
              <span>
                <BsCloudMinusFill className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input iscorrect" type="checkbox" />
            <div className="form-floating answer-name">
              <input
                type="type"
                className="form-control"
                placeholder="name@example.com"
              />
              <label>Answer 1</label>
            </div>
            <div className="btn-group">
              <span>
                <FaRegCalendarPlus className="icon-add" />
              </span>
              <span>
                <FaRegCalendarMinus className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
