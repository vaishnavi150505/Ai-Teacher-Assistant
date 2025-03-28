import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch feedback data from the backend
    axios
      .get("http://localhost:5000/api/feedback")
      .then((response) => {
        setFeedback(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      });
  }, []);

  // Function to determine emoji based on feedback score
  const getEmoji = (score) => {
    if (score >= 90) return "🌟"; // Excellent
    if (score >= 75) return "👍"; // Good job
    if (score >= 50) return "📌"; // Needs improvement
    return "❗"; // Poor performance
  };

  return (
    <div className="feedback-container">
      <h2>📊 Personalized AI Feedback</h2>
      {loading ? (
        <p>⏳ Loading feedback...</p>
      ) : feedback.length > 0 ? (
        feedback.map((item) => (
          <div key={item.id} className="feedback-item">
            <p className="assignment-title">
              <strong>📁 Assignment:</strong> {item.assignmentTitle}
            </p>
            <p className="score">
              <strong>🏆 Score:</strong> {item.score} {getEmoji(item.score)}
            </p>
            <p className="comments">
              <strong>💬 Comments:</strong> {item.comments}
            </p>
          </div>
        ))
      ) : (
        <p>🚫 No feedback available yet.</p>
      )}
    </div>
  );
};

export default Feedback;
