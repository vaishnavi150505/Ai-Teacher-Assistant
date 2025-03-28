import React from "react";
import "./Home.css";
import card1 from "../assets/card1.jpeg";
import card2 from "../assets/card2.jpeg";
import card3 from "../assets/card3.jpeg";
import booksFooter from "../assets/books.jpeg";
const Home = () => {
  return (
    <div className="home-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>🚀 Welcome to the AI-Powered Teacher Assistant</h1>
        <p>📚 Revolutionizing education with automated grading and personalized feedback.</p>
        <button className="get-started-btn" onClick={() => window.location.href = "/Register"}>
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="cards-container">
        <div className="card">
        <img src={card1} alt="AI Teaching Assistant" className="card-image" />
          <h3>🔹 Features of This Platform</h3>
          <p>✅ AI-powered grading system</p>
          <p>✅ Instant personalized feedback</p>
          <p>✅ Student progress tracking</p>
        </div>
        <div className="card">
          <img src={card2} alt="Why Needed" className="card-image" />
          <h3>❓ Why It Is Needed?</h3>
          <p>📌 Saves teachers' time</p>
          <p>📌 Provides accurate feedback</p>
          <p>📌 Enhances learning efficiency</p>
        </div>
        <div className="card">
          <img src={card3} alt="Who Can Use" className="card-image" />
          <h3>👥 Who Can Use It?</h3>
          <p>🎓 School & College Teachers</p>
          <p>📖 Tutors & Mentors</p>
          <p>🏫 Educational Institutions</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-left">
        <img src={booksFooter} alt="Footer" className="footer-image" />
        </div>
        <div className="footer-right">
          <h3>📞 Contact Us</h3>
          <p>📧 Email: support@ai-teacher.com</p>
          <p>📱 Phone: +123-456-7890</p>
          <p>© 2025 AI-Powered Teacher Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
