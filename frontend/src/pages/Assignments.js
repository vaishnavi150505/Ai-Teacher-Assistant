import React, { useState } from "react";
import "./Assignments.css";
import assignmentIcon from "../assets/assignments.jpeg"; // Placeholder image for assignments

const Assignments = () => {
  const [files, setFiles] = useState([]); // Local state to store uploaded files

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];

    if (!uploadedFile) {
      alert("Please select a file to upload.");
      return;
    }

    // Store file as a URL for preview
    const fileURL = URL.createObjectURL(uploadedFile);

    setFiles([...files, { name: uploadedFile.name, url: fileURL }]);
  };

  return (
    <div className="assignments">
      <h2>Student Assignments</h2>
      <p>Upload and track your assignments.</p>

      <div className="upload-section">
        <h3>Upload Assignment</h3>
        <input type="file" onChange={handleFileUpload} />
      </div>

      <div className="assignment-list">
        <h3>Submitted Assignments</h3>
        {files.length > 0 ? (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <img src={assignmentIcon} alt="Assignment" className="assignment-icon" />
                <a href={file.url} download={file.name}>{file.name}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;
