import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogList } from '../../config/data';
import './styles.css';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();   // ✅ Move here
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs"));

    const blogsToSearch =
      storedBlogs && storedBlogs.length ? storedBlogs : blogList;

    const foundBlog = blogsToSearch.find(
      (b) => b.id === Number(id)
    );

    setBlog(foundBlog || null);
  }, [id]);

  // ✅ AFTER all hooks
  if (!blog) {
    return <h2 style={{ padding: "20px" }}>Blog not found</h2>;
  }

  const handleDelete = () => {
    const storedBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    const updatedBlogs = storedBlogs.filter(
      (item) => item.id !== blog.id
    );

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    navigate("/");
  };

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>

      <div className='blog-wrap'>
        <header>
          <p className='blog-date'>Published {blog.createdAt}</p>
          <h1>{blog.title}</h1>
        </header>

        <img src={blog.cover} alt='cover' />
        <p className='blog-desc'>{blog.description}</p>
      </div>

      {blog && (
        <Link to={`/edit/${blog.id}`}>
          <button>Edit</button>
        </Link>
      )}

      {blog && <button onClick={handleDelete}>Delete</button>}
    </>
  );
};

export default Blog;