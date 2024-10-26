import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUser,
} from "../../../../services/apiService";

const AssignQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchQuizzes();
    fetchUsers();
  }, []);

  // Fetch quizzes data from API
  const fetchQuizzes = async () => {
    try {
      const res = await getAllQuizForAdmin();
      if (res && res.EC === 0) {
        const quizOptions = res.DT.map((quiz) => ({
          value: quiz.id,
          label: `${quiz.id} - ${quiz.description}`,
        }));
        setListQuiz(quizOptions);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  // Fetch users data from API
  const fetchUsers = async () => {
    try {
      const res = await getAllUser();
      if (res && res.EC === 0) {
        const userOptions = res.DT.map((user) => ({
          value: user.id,
          label: `${user.id} - ${user.username} - ${user.email}`,
        }));
        setListUser(userOptions);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle assign button click
  const handleAssign = () => {
    if (selectedQuiz && selectedUser) {
      // Implement assignment logic here
      console.log("Assigning quiz:", selectedQuiz, "to user:", selectedUser);
    } else {
      alert("Please select both a quiz and a user.");
    }
  };

  return (
    <div className="assign-quiz-container row p-3">
      <div className="col-6 mb-4">
        <label className="form-label">Select Quiz</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
          placeholder="Choose a quiz..."
        />
      </div>

      <div className="col-6 mb-4">
        <label className="form-label">Select User</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
          placeholder="Choose a user..."
        />
      </div>

      <div className="col-12 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleAssign}>
          Assign Quiz
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
