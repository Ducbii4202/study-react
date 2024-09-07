import React from "react";
import { useParams } from "react-router-dom";

const DetailQuiz = (props) => {
  const params = useParams();
  console.log("check ", params);
  return <div className="detail-quiz-container">detailquiz</div>;
};

export default DetailQuiz;
