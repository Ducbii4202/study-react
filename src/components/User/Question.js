/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const { data, index, handleCheckBox } = props; // Fixed prop typo
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return null; // Better to return null instead of an empty fragment when no data
  }

  const handleCheckboxChange = (event, aId, qId) => {
    // Fixed typo in function name
    handleCheckBox(aId, qId); // Fixed typo in function call
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`} // Corrected base64 image format typo
          />
          {isPreviewImage && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`} // Corrected base64 image format typo
              title="Question Image"
              onClose={() => setIsPreviewImage(false)}
            />
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.map(
            (
              a,
              index // Removed redundant length check and mapped directly
            ) => (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={(event) =>
                      handleCheckboxChange(event, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default Question;
