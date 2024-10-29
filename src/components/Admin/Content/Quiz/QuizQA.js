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
  getQuizWithQA,
  postUpsertQA,
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

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImageReview, setDataImageReview] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuiz]);

  const urltiFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  };

  const fetchQuizWithQA = async () => {
    let rs = await getQuizWithQA(selectedQuiz.value);
    if (rs && rs.EC === 0) {
      let newQA = await Promise.all(
        rs.DT.qa.map(async (q) => {
          if (q.imageFile) {
            q.imageFile = await urltiFile(
              `data:image/png;base64,${q.imageFile}`,
              `Question-${q.id}`,
              "image/png"
            );
          }
          return q;
        })
      );

      setQuestions(newQA);
    }
  };

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

  const handleSaveQuestionsForQuiz = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // Validate answers and questions
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        toast.error(`Question ${i + 1} description cannot be empty.`);
        return;
      }
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          toast.error(`Answer ${j + 1} in Question ${i + 1} cannot be empty.`);
          return;
        }
      }
    }

    // Submit questions and answers
    let questionClone = _.cloneDeep(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
    // setQuestions(initialQuestions);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onload = () => resolve(render.result);
      render.onerror = (error) => reject(error);
    });

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
