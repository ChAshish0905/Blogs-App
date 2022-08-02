import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Posts from "./Posts";
import Post from "./Post";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Router>
      <nav>
        <Link className={classes.link} to="/posts">
          Click here to view the list of posts
        </Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/"></Route>
        <Route path="posts" element={<Posts username={props.username} />} />
        <Route path="post/:id" element={<Post username={props.username} />} />
      </Routes>
    </Router>
  );
};

export default Home;
