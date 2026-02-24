import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import "./App.css";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<CreateBlog />} />
      </Routes>
    </div>
  );
};

export default App;
