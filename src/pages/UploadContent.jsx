import React, { useState } from "react";
import { uploadContent } from "../api/api";

export default function UploadContent() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("pdf");
  const [access, setAccess] = useState("free");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("access", access);
    formData.append("tags", tags.split(",").map((t) => t.trim()));
    formData.append("file", file);

    try {
      await uploadContent(formData); // token is automatic
      alert("Content uploaded successfully");
      setTitle("");
      setType("pdf");
      setAccess("free");
      setTags("");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Upload New Content</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="blog">Blog</option>
          <option value="prompt">Prompt</option>
        </select>
        <select value={access} onChange={(e) => setAccess(e.target.value)}>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
          <option value="program-specific">Program-Specific</option>
        </select>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
