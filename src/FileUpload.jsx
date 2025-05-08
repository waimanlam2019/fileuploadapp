import React, { useState } from 'react';
import banner from './assets/images/banner.png';

function FileUpload({ accessToken }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // ✅ 1. Check file type (MIME)
    const allowedTypes = [ "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
        alert("Only DOC, DOCX, or PDF files are allowed.");
        return;
    }

    // ✅ 2. Check file size (in bytes)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (selectedFile.size > maxSize) {
        alert("File is too large. Max size is 2MB.");
        return;
    }

    // ✅ All checks passed
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log(accessToken);
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Upload successful!");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="app-container">
      <img src={banner} alt="Banner" 
      style={{ width: "50%", height: "auto", marginBottom: "1rem" }}
      />
      <div className='horizontal-container'>
        <input type="file"
          accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
          onChange={handleChange}
        />
        <button onClick={handleUpload} style={{ marginLeft: "1rem" }}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
