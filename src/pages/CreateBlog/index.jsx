import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    cover: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    const newBlog = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
      authorName: "Nitin",
      authorAvatar: "https://i.pravatar.cc/150?img=3",
    };

    const updatedBlogs = [newBlog, ...existingBlogs];

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <br /><br />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <br /><br />
        <input name="cover" placeholder="Image URL" onChange={handleChange} required />
        <br /><br />
        <textarea name="content" placeholder="Content" onChange={handleChange} required />
        <br /><br />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;