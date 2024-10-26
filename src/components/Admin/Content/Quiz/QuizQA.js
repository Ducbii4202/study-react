import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { BsCloudPlus, BsCloudMinusFill } from "react-icons/bs";
import {
  FaRegCalendarMinus,
  FaRegCalendarPlus,
  FaRegImage,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const initialQuestions = [
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

  // State for selected quiz, list of quizzes, questions, and image preview
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImageReview, setDataImageReview] = useState({
    title: "",
    url: "",
  });

  // Fetch quizzes when component mounts
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      const quizOptions = res.DT.map((quiz) => ({
        value: quiz.id,
        label: `${quiz.id} - ${quiz.description}`,
      }));
      setListQuiz(quizOptions);
    }
  };

  // Add or remove a question
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
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  // Add or remove an answer for a specific question
  const handleAddRemoveQuestionAnswer = (type, questionId, answerId) => {
    const updatedQuestions = _.cloneDeep(questions);
    const questionIndex = updatedQuestions.findIndex(
      (q) => q.id === questionId
    );

    if (type === "ADD") {
      updatedQuestions[questionIndex].answers.push({
        id: uuidv4(),
        description: "",
        isCorrect: false,
      });
    } else if (type === "REMOVE") {
      updatedQuestions[questionIndex].answers = updatedQuestions[
        questionIndex
      ].answers.filter((answer) => answer.id !== answerId);
    }

    setQuestions(updatedQuestions);
  };

  // Handle file input for questions (for image upload)
  const handleOnChangeFileQuestion = (questionId, e) => {
    if (e.target.files && e.target.files[0]) {
      const updatedQuestions = _.cloneDeep(questions);
      const questionIndex = updatedQuestions.findIndex(
        (q) => q.id === questionId
      );

      updatedQuestions[questionIndex].imageFile = e.target.files[0];
      updatedQuestions[questionIndex].imageName = e.target.files[0].name;
      setQuestions(updatedQuestions);
    }
  };

  // Save the questions and answers for the quiz
  const handleSaveQuestionsForQuiz = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // Validate all answers
    let isValidAnswer = true;
    let questionIndex = 0,
      answerIndex = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          answerIndex = j;
          break;
        }
      }
      if (!isValidAnswer) {
        questionIndex = i;
        break;
      }
    }

    if (!isValidAnswer) {
      toast.error(
        `Answer ${answerIndex + 1} in Question ${
          questionIndex + 1
        } cannot be empty.`
      );
      return;
    }

    // Validate all questions
    let isValidQuestion = true;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        questionIndex = i;
        break;
      }
    }

    if (!isValidQuestion) {
      toast.error(`Question ${questionIndex + 1} description cannot be empty.`);
      return;
    }

    // Submit questions and answers
    for (const question of questions) {
      const qRes = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          qRes.DT.id
        );
      }
    }

    toast.success("Questions and answers saved successfully!");
    setQuestions(initialQuestions); // Reset the questions form
  };

  // Handle image preview for a question
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
      <div className="add-new-questions">
        <div className="col-6 form-group">
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
                  {question.imageName || "0 file is uploaded"}
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

export default QuizQA;
