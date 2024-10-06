import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsCloudPlus, BsCloudMinusFill } from "react-icons/bs";
import { FaRegCalendarMinus, FaRegCalendarPlus } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "answer 2",
          isCorrect: false,
        },
      ],
    },
  ]);
  console.log("questions", questions);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = questions;
      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };
  const handleAddRemoveQuestionAnswer = (type, id) => {
    // if (type === "ADD") {
    //   const newQuestion = {
    //     id: uuidv4(),
    //     description: "",
    //     imageFile: "",
    //     imageName: "",
    //     answers: [
    //       {
    //         id: uuidv4(),
    //         description: "",
    //         isCorrect: false,
    //       },
    //     ],
    //   };
    //   setQuestions([...questions, newQuestion]);
    // }
    // if (type === "REMOVE") {
    //   let questionClone = questions;
    //   questionClone = questionClone.filter((item) => item.id !== id);
    //   setQuestions(questionClone);
    // }
  };
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

        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(e) => {
                        let questionClone = _.cloneDeep(questions);
                        questionClone[index].description = e.target.value;
                        setQuestions(questionClone);
                      }}
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    <label>
                      <FaRegImage className="label-up" />
                    </label>
                    <input type={"file"} hidden />
                    <span>0 file is uploaded</span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <BsCloudPlus className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <BsCloudMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input iscorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(e) => {
                            let questionClone = _.cloneDeep(questions);
                            questionClone[questions.indexOf(question)].answers[
                              index
                            ].isCorrect = e.target.checked;
                            setQuestions(questionClone);
                          }}
                        />
                        <div className="form-floating answer-name">
                          <input
                            value={answer.description}
                            type="text"
                            className="form-control"
                            placeholder="Answer description"
                            onChange={(e) => {
                              let questionClone = _.cloneDeep(questions);
                              questionClone[
                                questions.indexOf(question)
                              ].answers[index].description = e.target.value;
                              setQuestions(questionClone);
                            }}
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveQuestionAnswer("ADD", question.id)
                            }
                          >
                            <FaRegCalendarPlus className="icon-add" />
                          </span>
                          {question.answer.length > 0 && (
                            <span
                              onClick={() =>
                                handleAddRemoveQuestionAnswer(
                                  "REMOVE",
                                  answer.id
                                )
                              }
                            >
                              <FaRegCalendarMinus className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
