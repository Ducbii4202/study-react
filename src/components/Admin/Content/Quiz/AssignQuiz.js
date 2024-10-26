import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUser,
} from "../../../../services/apiService";
const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchQuizzes();
    fetchUser();
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

  const fetchUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      const userOptions = res.DT.map((item) => ({
        value: item.id,
        label: `${item.id} - ${item.username} - ${item.email}`,
      }));
      setListUser(userOptions);
    }
  };
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label className="mb-2">Select Quiz</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>

      <div className="col-6 form-group">
        <label className="mb-2">Select User</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div>
        <button className="btn btn-warning  mt-3">Assign</button>
      </div>
    </div>
  );
};

export default AssignQuiz;
