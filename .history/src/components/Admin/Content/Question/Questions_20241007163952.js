import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsCloudPlus, BsCloudMinusFill } from "react-icons/bs";
import { FaRegCalendarMinus, FaRegCalendarPlus } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const Questions = (props) => {
  // Các tùy chọn của select box để chọn quiz
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // Khởi tạo state lưu quiz đã chọn và danh sách câu hỏi
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(), // ID duy nhất của câu hỏi
      description: "question 1", // Mô tả của câu hỏi
      imageFile: "", // Tệp hình ảnh (nếu có)
      imageName: "", // Tên tệp hình ảnh (nếu có)
      answers: [
        {
          id: uuidv4(), // ID duy nhất của câu trả lời
          description: "answer 1", // Mô tả câu trả lời
          isCorrect: false, // Đánh dấu câu trả lời đúng hoặc sai
        },
      ],
    },
  ]);
  console.log("questions", questions);

  const [isPreviewImage, setIsReviewImage] = useState(false);

  /**
   * Hàm `handleAddRemoveQuestion`
   * Dùng để thêm hoặc xóa câu hỏi.
   * @param {string} type - Loại hành động ('ADD' hoặc 'REMOVE').
   * @param {string} id - ID của câu hỏi (dùng khi xóa).
   */
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      // Thêm một câu hỏi mới với các thông tin mặc định
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
      setQuestions([...questions, newQuestion]); // Cập nhật state câu hỏi
    }
    if (type === "REMOVE") {
      // Xóa câu hỏi dựa trên ID
      let questionClone = questions;
      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };

  /**
   * Hàm `handleAddRemoveQuestionAnswer`
   * Dùng để thêm hoặc xóa câu trả lời cho một câu hỏi cụ thể.
   * @param {string} type - Loại hành động ('ADD' hoặc 'REMOVE').
   * @param {string} questionId - ID của câu hỏi chứa câu trả lời.
   * @param {string} answerId - ID của câu trả lời (dùng khi xóa).
   */
  const handleAddRemoveQuestionAnswer = (type, questionId, answerId) => {
    // Sao chép mảng câu hỏi để xử lý (tránh thay đổi trực tiếp state)
    const questionClone = _.cloneDeep(questions);
    const questionIndex = questionClone.findIndex((q) => q.id === questionId);

    if (type === "ADD") {
      // Thêm một câu trả lời mới với thông tin mặc định
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      questionClone[questionIndex].answers.push(newAnswer);
    } else if (type === "REMOVE" && answerId) {
      // Xóa câu trả lời dựa trên ID của câu trả lời
      questionClone[questionIndex].answers = questionClone[
        questionIndex
      ].answers.filter((answer) => answer.id !== answerId);
    }
    setQuestions(questionClone); // Cập nhật lại state
  };

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionClone[index].imageFile = e.target.files[0];
      questionClone[index].imageName = e.target.files[0].name;
      setQuestions(questionClone);
    }
  };
  const handleSaveQuestionsForQuiz = () => {
    console.log(questions);
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <hr />
      <div className="add-new-questions">
        {/* Chọn quiz */}
        <div className="col-6 from-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            value={selectedQuiz} // Giá trị hiện tại của quiz đã chọn
            onChange={setSelectedQuiz} // Hàm xử lý khi chọn quiz
            options={options} // Tùy chọn trong dropdown
          />
        </div>
        <div className="mt-3 mb-2">Add questions:</div>

        {/* Danh sách câu hỏi */}
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content">
                  {/* Mô tả của câu hỏi */}
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(e) => {
                        let questionClone = _.cloneDeep(questions);
                        questionClone[index].description = e.target.value; // Cập nhật mô tả câu hỏi
                        setQuestions(questionClone);
                      }}
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>

                  {/* Tải lên hình ảnh cho câu hỏi */}
                  <div className="group-upload">
                    <label htmlFor={`${question.id}`}>
                      <FaRegImage className="label-up" />
                    </label>
                    <input
                      id={`${question.id}`}
                      type={"file"}
                      hidden
                      onChange={(e) => {
                        handleOnChangeFileQuestion(question.id, e);
                      }}
                    />
                    <span>
                      {question.imageName ? (
                        <span onClick={() => setIsReviewImage(true)}>
                          {question.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
                  </div>

                  {/* Thêm hoặc xóa câu hỏi */}
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

                {/* Danh sách các câu trả lời cho câu hỏi hiện tại */}
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        {/* Checkbox đánh dấu câu trả lời đúng/sai */}
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

                        {/* Mô tả câu trả lời */}
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

                        {/* Thêm hoặc xóa câu trả lời */}
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveQuestionAnswer("ADD", question.id)
                            }
                          >
                            <FaRegCalendarPlus className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveQuestionAnswer(
                                  "REMOVE",
                                  question.id,
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

                {isPreviewImage === true && (
                  <Lightbox
                    image={URL.createObjectURL(question.imageFile)}
                    title={question.imageName}
                    onClose={() => setIsReviewImage(false)}
                  ></Lightbox>
                )}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSaveQuestionsForQuiz()}
            >
              Save Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
