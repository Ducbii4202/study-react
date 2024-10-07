/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      <div className="q-image">
        <img src={`data:image/jpeg/jpeq;base64,${data.image}`} />
      </div>
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.lenght &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                {a.answerDescription}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
