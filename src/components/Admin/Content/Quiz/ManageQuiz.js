import React, { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { Accordion } from "react-bootstrap";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

// Quiz difficulty options
const options = [
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(null);
  const [image, setImage] = useState(null);

  // Handle file input change
  const handleChangeFile = (e) => {
    if (e.target?.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name and Description are required");
      return;
    }

    const res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res?.EC === 0) {
      toast.success(res.EM);
      resetForm();
    } else {
      toast.error(res.EM);
    }
  };

  // Reset form fields after submission
  const resetForm = () => {
    setName("");
    setDescription("");
    setType(null);
    setImage(null);
  };

  return (
    <div className="manage-quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <fieldset className="border rounded-3 p-3">
              <legend className="w-auto px-3">Add New Quiz</legend>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quiz Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="quizName">Quiz Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="mb-3">
                <Select
                  value={type}
                  onChange={setType}
                  options={options}
                  placeholder="Select Difficulty"
                />
              </div>
              <div className="form-group mb-3">
                <label>Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleChangeFile}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={handleSubmitQuiz}>
                  Save
                </button>
              </div>
            </fieldset>
            <div className="quiz-list mt-4">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Q/A Questions</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
