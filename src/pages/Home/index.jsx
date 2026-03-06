import React, { useState, useEffect } from "react";
import EmptyList from "../../components/common/Chip/EmptyList";
import BlogList from "../../components/Home/BlogList";
import Header from "../../components/Home/Header";
import SearchBar from "../../components/Home/SearchBar";
import { blogList } from "../../config/data";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState(blogList);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    if (storedBlogs.length > 0) {
      setBlogs(storedBlogs);
    } else {
      setBlogs(blogList);
    }
  }, []);

  const [searchKey, setSearchKey] = useState("");

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
  const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  
  const allBlogs = storedBlogs.length > 0 ? storedBlogs : blogList;

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
  );

  setBlogs(filteredBlogs);
};


  // Clear search and show all blogs
  const handleClearSearch = () => {
  const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  setBlogs(storedBlogs.length > 0 ? storedBlogs : blogList);
  setSearchKey("");
};

  return (
    <div>
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}

      <Link to="/create">
        <button>Create Blog</button>
      </Link>
    </div>
  );
};

export default Home;
