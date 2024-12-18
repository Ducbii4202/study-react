import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./QuizContent/RightContent";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const DetailQuiz = () => {
  const { id: quizId } = useParams(); // Extract quizId from the URL
  const location = useLocation(); // Access location state

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    // Fetch quiz questions whenever quizId changes
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  // Fetch quiz data
  const fetchQuestions = async () => {
    try {
      const res = await getDataQuiz(quizId);

      if (res && res.EC === 0) {
        // Group and process quiz data
        const groupedQuestions = _(res.DT)
          .groupBy("id")
          .map((questions, key) => {
            const answers = _.orderBy(
              questions.map((item) => ({
                ...item.answers,
                isSelected: false,
              })),
              ["id"],
              ["asc"]
            );
            return {
              questionId: key,
              answers,
              questionDescription: questions[0].description,
              image: questions[0].image,
            };
          })
          .value();
        setDataQuiz(groupedQuestions);
      } else {
        alert("Error fetching quiz data: " + (res?.EM || "Unknown error."));
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      alert("An error occurred while fetching quiz data.");
    }
  };

  // Navigate to the previous question
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // Navigate to the next question
  const handleNext = () => {
    if (currentIndex < dataQuiz.length - 1) setCurrentIndex(currentIndex + 1);
  };

  // Submit the quiz
  const handleFinishQuiz = async () => {
    const payload = {
      quizId: Number(quizId),
      answers: dataQuiz.map((question) => ({
        questionId: Number(question.questionId),
        userAnswerId: question.answers
          .filter((answer) => answer.isSelected)
          .map((answer) => answer.id),
      })),
    };

    try {
      const res = await postSubmitQuiz(payload);

      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("Error submitting answers: " + (res?.EM || "Unknown error."));
      }
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
      alert("An error occurred while submitting your answers.");
    }
  };

  // Handle checkbox selection for answers
  const handleCheckBox = (answerId, questionId) => {
    const updatedQuizData = _.cloneDeep(dataQuiz); // Deep copy to avoid mutating state
    const question = updatedQuizData.find(
      (item) => Number(item.questionId) === Number(questionId)
    );

    if (question) {
      question.answers = question.answers.map((answer) =>
        answer.id === answerId
          ? { ...answer, isSelected: !answer.isSelected }
          : answer
      );
      setDataQuiz(updatedQuizData);
    }
  };

  return (
    <>
      <Breadcrumb className="quiz-detail-new-header">
        <NavLink to="/" className="breadcrumb-item">
          Home
        </NavLink>
        <NavLink to="/users" className="breadcrumb-item">
          User
        </NavLink>
        <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
      </Breadcrumb>

      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state?.quizTitle || "Quiz"}
          </div>
          <hr />
          <div className="q-content">
            {dataQuiz.length > 0 && (
              <Question
                index={currentIndex}
                handleCheckBox={handleCheckBox}
                data={dataQuiz[currentIndex]}
              />
            )}
          </div>
          <div className="footer">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Prev
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={currentIndex === dataQuiz.length - 1}
            >
              Next
            </button>
            <button className="btn btn-warning" onClick={handleFinishQuiz}>
              Finish
            </button>
          </div>
        </div>

        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setIndex={setCurrentIndex}
          />
        </div>

        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};

export default DetailQuiz;
