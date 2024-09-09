import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsCloudPlus, BsCloudMinusFill } from "react-icons/bs";
import { FaRegCalendarMinus, FaRegCalendarPlus } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: "",
      description: "",
      image: "",
      answers: [
        {
          id: "",
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-questions">
        <div className="col-6 from-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">Add questions:</div>
        <div>
          <div className="questions-content">
            <div className="form-floating description">
              <input
                type="type"
                class="form-control"
                placeholder="name@example.com"
              />
              <label>Question's description</label>
            </div>
            <div className="group-upload">
              <label>
                <FaRegImage className="label-up" />
              </label>
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
