import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./QuizContent/RightContent";

const DetailQuiz = () => {
  const { id: quizId } = useParams();
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    try {
      const res = await getDataQuiz(quizId);
      if (res && res.EC === 0) {
        const data = _(res.DT)
          .groupBy("id")
          .map((value, key) => {
            const answers = value.map((item) => ({
              ...item.answers,
              isSelected: false,
            }));
            return {
              questionId: key,
              answers,
              questionDescription: value[0].description,
              image: value[0].image,
            };
          })
          .value();
        setDataQuiz(data);
      } else {
        console.error("Error fetching quiz data:", res);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleFinishQuiz = async () => {
    const payload = {
      quizId: +quizId,
      answers: dataQuiz.map((question) => ({
        questionId: +question.questionId,
        userAnswerId: question.answers
          .filter((a) => a.isSelected)
          .map((a) => a.id),
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
        alert("Something went wrong with your answers submission.");
      }
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    const dataQuizClone = _.cloneDeep(dataQuiz);
    const question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );

    if (question) {
      question.answers = question.answers.map((answer) =>
        answer.id === answerId
          ? { ...answer, isSelected: !answer.isSelected }
          : answer
      );

      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle || "Quiz"}
        </div>
        <hr />
        <div className="q-content">
          <Question
            index={index}
            handleCheckBox={handleCheckBox}
            data={dataQuiz.length > 0 ? dataQuiz[index] : {}}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={handlePrev}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
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
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
