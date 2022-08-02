import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Posts.module.css";
import Card from "../UI/Card";
const url = "https://jsonplaceholder.typicode.com/posts";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch(url);
    const posts = await response.json();
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (post) => {
    setPosts(
      posts.filter((item) => {
        return item !== post;
      })
    );
  };

  return (
    <div className={classes.posts}>
      <h1>List of Posts</h1>
      <ul>
        {posts.map((post) => {
          const { id, title } = post;
          return (
            <Card>
              <li key={id} className={classes.post}>
                <h3>{title}</h3>
                <Link className={classes.link} to={`/post/${id}`}>
                  More Details{" "}
                </Link>
                <br />
                {props.username === "User2" && (
                  <button
                    className={classes.btn}
                    onClick={() => deletePost(post)}
                  >
                    Delete
                  </button>
                )}
              </li>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
