import React from "react";
import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      <div className="question">Question {index + 1}: Fack</div>
      <div className="answer">
        <div className="a-child">A.dikjsbdfk</div>
        <div className="b-child">B.dikjsbdfk</div>
        <div className="c-child">C.dikjsbdfk</div>
      </div>
    </>
  );
};

export default Question;
