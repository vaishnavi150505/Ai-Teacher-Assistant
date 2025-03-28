import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);

  // Fetch feedback data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedback")
      .then((response) => setFeedbackList(response.data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  // Enable editing mode for a specific feedback item
  const handleEdit = (feedback) => {
    setEditingFeedback({ ...feedback });
  };

  // Handle input changes in the editing form
  const handleChange = (e) => {
    setEditingFeedback({ ...editingFeedback, [e.target.name]: e.target.value });
  };

  // Save the edited feedback
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/feedback/${editingFeedback.id}`,
        editingFeedback
      );

      // Update feedback list after saving
      setFeedbackList((prev) =>
        prev.map((item) =>
          item.id === editingFeedback.id ? editingFeedback : item
        )
      );

      setEditingFeedback(null);
      alert("Feedback updated successfully!");
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert("Failed to update feedback.");
    }
  };

  return (
    <div className="dashboard">
      <h2>Teacher Dashboard - Review & Edit Feedback</h2>

      {feedbackList.length > 0 ? (
        <div className="feedback-list">
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="feedback-item">
              {editingFeedback && editingFeedback.id === feedback.id ? (
                <div className="edit-feedback">
                  <label>Score:</label>
                  <input
                    type="number"
                    name="score"
                    value={editingFeedback.score}
                    onChange={handleChange}
                  />

                  <label>Comments:</label>
                  <textarea
                    name="comments"
                    value={editingFeedback.comments}
                    onChange={handleChange}
                  />

                  <label>Suggestions:</label>
                  <textarea
                    name="suggestions"
                    value={editingFeedback.suggestions}
                    onChange={handleChange}
                  />

                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingFeedback(null)}>Cancel</button>
                </div>
              ) : (
                <div className="feedback-details">
                  <p><strong>Score:</strong> {feedback.score}</p>
                  <p><strong>Comments:</strong> {feedback.comments}</p>
                  <p><strong>Suggestions:</strong> {feedback.suggestions}</p>
                  <button onClick={() => handleEdit(feedback)}>Edit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
};

export default Dashboard;
