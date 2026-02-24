import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    cover: "",
  });

  useEffect(() => {
    if (id) {
      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const blogToEdit = blogs.find((b) => b.id === Number(id));
      if (blogToEdit) setFormData(blogToEdit);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    if (id) {
      // EDIT
      const updatedBlogs = blogs.map((b) =>
        b.id === Number(id) ? { ...formData, id: Number(id) } : b
      );
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    } else {
      // CREATE
      const newBlog = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toLocaleDateString(),
        authorName: "Nitin",
        authorAvatar: "https://i.pravatar.cc/150?img=3",
      };

      localStorage.setItem("blogs", JSON.stringify([newBlog, ...blogs]));
    }

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit Blog" : "Create Blog"}</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} placeholder="Title" onChange={handleChange} required />
        <br /><br />

        <input name="category" value={formData.category} placeholder="Category" onChange={handleChange} required />
        <br /><br />

        <input name="cover" value={formData.cover} placeholder="Image URL" onChange={handleChange} required />
        <br /><br />

        <textarea name="content" value={formData.content} placeholder="Content" onChange={handleChange} required />
        <br /><br />

        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateBlog;