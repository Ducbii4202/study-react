import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ form 'lodash'

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log("check questions", res);
    if (res && res.EC === 0) {
      let raw = res.DT;
     let data =  _.chain(raw)
        .groupBy("color")
       .map((value, (key) => ({ color: key, users: value })))
       .value();
    }
  };
  return <div className="detail-quiz-container">detailquiz</div>;
};

export default DetailQuiz;
