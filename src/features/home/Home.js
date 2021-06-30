import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../user/userSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  // console.log(allPosts);
  const [comment,setComment] = useState("")
  const { user } = useSelector(userSelector);
  // console.log(user);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get_all_posts",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log(response);
      setAllPosts(response.data.data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const likeHandler = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/like_post",
        {
          postId: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      fetchAllPosts();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const unlikeHandler = async (id) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/unlike_post",
        {
          postId: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      fetchAllPosts();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const makeComment = async (text, id) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/add_comment",
        {
          comment: text,
          postId: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data.data);
      fetchAllPosts();
      setComment("")
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deletePost = async (postId) => {
    console.log(postId);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/delete_post/${postId}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      fetchAllPosts();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="br-4">
      {allPosts.map((item, index) => {
        // console.log(item);
        return (
          <div
            className="flex flex-col max-w-lg mx-auto mt-5 br-3 border-current"
            key={index}
          >
            <div className="flex justify-between items-center">
              <h5 className="p-2"><Link to={item.postedBy._id !== user._id ? `/profile/${item.postedBy._id}` : "/profile"}>{item.postedBy.name}</Link></h5>
              {item.postedBy._id === user._id && (
                <i
                  className="fas fa-trash mr-3"
                  onClick={() => deletePost(item._id)}
                ></i>
              )}
            </div>

            <div>
              <img
                className="w-full h-80 object-cover"
                src={item.photo}
                alt=""
              />
            </div>
            <div className="m-2">
              {item.likes.includes(user._id) ? (
                <i
                  className="far fa-thumbs-down fa-lg"
                  onClick={() => unlikeHandler(item._id)}
                ></i>
              ) : (
                <i
                  className="far fa-thumbs-up fa-lg"
                  onClick={() => likeHandler(item._id)}
                ></i>
              )}
              <h4>{item.likes.length} likes</h4>
              <h4 className="p-0 m-0"><span className="mr-2 font-semibold">{item.postedBy.name}</span>{item.title}</h4>
              <p className="p-0 m-0">{item.body}</p>
              {item.comments.map((comment) => {
                return (
                  <h6 key={comment._id} className="font-light">
                    <span className="mr-2 font-semibold">
                      {comment.postedBy.name}
                    </span>
                    {comment.text}
                  </h6>
                );
              })}
              <div className="flex justify-between border-4 border-light-blue-500 border-opacity-50">
                <input
                  className="focus:outline-none ring-0"
                  type="text"
                  placeholder="add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <i className="flex far fa-comment fa-lg items-center" onClick={() => makeComment(comment, item._id)}></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
