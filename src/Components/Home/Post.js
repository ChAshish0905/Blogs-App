import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./Post.module.css";
const url = "https://jsonplaceholder.typicode.com/posts";

const Post = (props) => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const getPostDetails = async () => {
    const response = await fetch(`${url}/${parseInt(id)}`);
    const postDetails = await response.json();
    setPostDetails(postDetails);
    localStorage.setItem('posts',postDetails);
  };

  const getPostComments = async () => {
    const response = await fetch(`${url}/${parseInt(id)}/comments`);
    const postComments = await response.json();
    setPostComments(postComments);
  };

  useEffect(() => {
    getPostDetails();
    getPostComments();
  }, []);

  const deleteComment = (comment) => {
    setPostComments(
      postComments.filter((item) => {
        return item !== comment;
      })
    );
  };

  const changeTitleHandler = () => {
    if (newTitle) {
      setPostDetails((postDetails) => {
        const newPostDetails = { ...postDetails };
        newPostDetails.title = newTitle;
        return newPostDetails;
      });
      setEditTitle(false);
    }
  };

  return (
    <>
      <h1>{postDetails.title}</h1>
      <p>{postDetails.body}</p>
      {props.username === "User2" && (
        <button
          className={classes.btn}
          onClick={() => {
            setEditTitle(true);
          }}
        >
          Edit Title
        </button>
      )}
      {editTitle && (
        <div>
          <input
            type="text"
            placeholder="Enter new title.."
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            value={newTitle}
          ></input>
          <button onClick={changeTitleHandler}>Ok</button>
        </div>
      )}
      <br />
      <ul>
        <h3>Comments :</h3>
        {postComments.map((comment) => {
          const { id, name, email, body } = comment;
          return (
            <li key={id}>
              <span>
                <b>Name</b> : {name}
              </span>
              <br />
              <span>
                <b>Email</b> : {email}
              </span>
              <br />
              <span>
                <b>Comment</b> : {body}
              </span>
              <br />
              {props.username === "User2" && (
                <button
                  className={classes.btn}
                  onClick={() => deleteComment(comment)}
                >
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <Link to="/posts">Back</Link>
    </>
  );
};

export default Post;
