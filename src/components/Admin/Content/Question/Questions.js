import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { BsCloudPlus, BsCloudMinusFill } from "react-icons/bs";
import { FaRegCalendarMinus, FaRegCalendarPlus } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _, { flatMap } from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const Questions = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "question 1",
      imageFile: null,
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const [questions, setQuestions] = useState(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImageReview, setDataImageReview] = useState({
    title: "",
    url: "",
  });

  // Add or remove questions
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: null,
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
    } else if (type === "REMOVE") {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions);
    }
  };

  // Add or remove answers for a specific question
  const handleAddRemoveQuestionAnswer = (type, questionId, answerId) => {
    const questionClone = _.cloneDeep(questions);
    const questionIndex = questionClone.findIndex((q) => q.id === questionId);

    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      questionClone[questionIndex].answers.push(newAnswer);
    } else if (type === "REMOVE") {
      questionClone[questionIndex].answers = questionClone[
        questionIndex
      ].answers.filter((answer) => answer.id !== answerId);
    }
    setQuestions(questionClone);
  };

  // Handle file input for questions
  const handleOnChangeFileQuestion = (questionId, e) => {
    if (e.target.files && e.target.files[0]) {
      const questionClone = _.cloneDeep(questions);
      const index = questionClone.findIndex((item) => item.id === questionId);

      questionClone[index].imageFile = e.target.files[0];
      questionClone[index].imageName = e.target.files[0].name;
      setQuestions(questionClone);
    }
  };

  // Save the questions (you can implement the logic to send to API or other handlers)
  const handleSaveQuestionsForQuiz = async () => {
    //validate data
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }
    //validate answer
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }

    if (isValidAnswer === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    //validate question
    let isValidQ = true;
    let indexQ1 = 0;

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
      if (isValidQ === false) {
        toast.error(`Not empty description for Question ${indexQ1 + 1}`);
        return;
      }
    }

    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      //submit answer
      for (const answer of questions.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success("Create questions and answers succed!");
    setQuestions(initQuestions);
  };

  // Handle image preview
  const handleReviewImage = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.imageFile) {
      setDataImageReview({
        title: question.imageName,
        url: URL.createObjectURL(question.imageFile),
      });
      setIsPreviewImage(true);
    }
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
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add questions:</div>

        {questions.map((question, qIndex) => (
          <div key={question.id} className="q-main mb-4">
            <div className="questions-content">
              <div className="form-floating description">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter question description"
                  value={question.description}
                  onChange={(e) => {
                    const updatedQuestions = _.cloneDeep(questions);
                    updatedQuestions[qIndex].description = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                />
                <label>Question {qIndex + 1}'s description</label>
              </div>

              <div className="group-upload">
                <label htmlFor={question.id}>
                  <FaRegImage className="label-up" />
                </label>
                <input
                  id={question.id}
                  type="file"
                  hidden
                  onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                />
                <span
                  style={{ cursor: question.imageName ? "pointer" : "default" }}
                  onClick={() =>
                    question.imageName && handleReviewImage(question.id)
                  }
                >
                  {question.imageName
                    ? question.imageName
                    : "0 file is uploaded"}
                </span>
              </div>

              <div className="btn-add">
                <span onClick={() => handleAddRemoveQuestion("ADD")}>
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

            {question.answers.map((answer, aIndex) => (
              <div key={answer.id} className="answers-content">
                <input
                  className="form-check-input iscorrect"
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) => {
                    const updatedQuestions = _.cloneDeep(questions);
                    updatedQuestions[qIndex].answers[aIndex].isCorrect =
                      e.target.checked;
                    setQuestions(updatedQuestions);
                  }}
                />
                <div className="form-floating answer-name">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Answer description"
                    value={answer.description}
                    onChange={(e) => {
                      const updatedQuestions = _.cloneDeep(questions);
                      updatedQuestions[qIndex].answers[aIndex].description =
                        e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                  />
                  <label>Answer {aIndex + 1}</label>
                </div>

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
            ))}
          </div>
        ))}

        {questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={handleSaveQuestionsForQuiz}
            >
              Save Questions
            </button>
          </div>
        )}

        {isPreviewImage && (
          <Lightbox
            image={dataImageReview.url}
            title={dataImageReview.title}
            onClose={() => setIsPreviewImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
