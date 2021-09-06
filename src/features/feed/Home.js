import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../user/userSlice";
import { feedSelector } from "../feed/feedSlice";
import { Link } from "react-router-dom";
import {
  getAllPosts,
  likeHandler,
  unlikeHandler,
  deletePost,
  makeComment,
} from "./feedSlice";
import { profileSelector } from "../profile/profileSlice";
import Loader from "react-loader-spinner";
import CreatePost from "../post/CreatePost";

const Home = () => {
  const [div, setDiv] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [comment, setComment] = useState("");
  const { user, isFetching } = useSelector(userSelector);
  const { posts } = useSelector(feedSelector);
  const { profile } = useSelector(profileSelector);
  console.log(profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token !== null) {
      (async function () {
        await dispatch(getAllPosts());
      })();
    }
    // eslint-disable-next-line
  }, [user.token]);

  const likeHandlerCall = (id) => {
    dispatch(likeHandler(id));
  };

  const unlikeHandlerCall = (id) => {
    dispatch(unlikeHandler(id));
  };

  const deletePostCall = (postId) => {
    dispatch(deletePost(postId));
  };

  const makeCommentCall = (text, id) => {
    dispatch(makeComment({ text, id }));
    setComment("");
  };

  const createPostDiv = () => {
    createPost === false ? setCreatePost(true) : setCreatePost(false);
  };

  return (
    <>
      {isFetching && (
        <div className="flex flex-col justify-center items-center absolute inset-0 z-10">
          {" "}
          <Loader type="TailSpin" color="#00BFFF" height={70} width={70} />
        </div>
      )}
      <div className="flex flex-col  p-6 max-w-2xl mx-auto mt-2 border border-gray-500 rounded-lg border-current">
        <button
          onClick={createPostDiv}
          className="justify-center items-center border border-gray-500 rounded-lg border-current bg-gray-300 p-3"
        >
          Write a post.
        </button>
      </div>

      {createPost && (
        <CreatePost createPost={createPost} setPost={setCreatePost} />
      )}

      {posts.map((item, index) => {
        return (
          <div
            className="flex flex-col max-w-2xl mx-auto mt-2 border border-gray-500 rounded-lg border-current"
            key={index}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center">
                <img
                  src={item.photo}
                  className="rounded-full w-16 h-16 object-cover m-1"
                  alt="img"
                />
                <div className="flex flex-col justify-center items-start ml-2">
                  <h5 className="font-bold">
                    <Link
                      to={
                        item.postedBy._id !== user._id
                          ? `/profile/${item.postedBy._id}`
                          : "/profile"
                      }
                    >
                      {item.postedBy.name}
                    </Link>
                  </h5>
                  <small> {new Date(item.created_at).toDateString()}</small>
                </div>
              </div>
              {item.postedBy._id === user._id && (
                <i
                  className="fas fa-trash mr-3 cursor-pointer"
                  onClick={() => deletePostCall(item._id)}
                ></i>
              )}
            </div>
            <div className="flex flex-col justify-start m-3">
              <h4 className="p-0 m-0 ">
                <span className="mr-2 font-semibold tracking-wide">
                  {item.title}
                </span>
              </h4>
              <p className="p-0 m-0">{item.body}</p>
            </div>

            <div>
              <img
                className="w-full h-auto object-cover max-w-2xl rounded-sm border-gray-500"
                src={item.photo}
                alt=""
              />
            </div>

            <div className="flex p-3 gap-x-3">
              {item.likes.includes(user._id) ? (
                <i
                  className="far fa-thumbs-down fa-lg cursor-pointer"
                  onClick={() => unlikeHandlerCall(item._id)}
                ></i>
              ) : (
                <i
                  className="far fa-thumbs-up fa-lg cursor-pointer"
                  onClick={() => likeHandlerCall(item._id)}
                ></i>
              )}
              <span> {item.likes.length}</span>
              <button
                onClick={() => {
                  div === true ? setDiv(false) : setDiv(true);
                }}
              >
                <span>
                  <i className="far fa-comment-alt fa-lg"></i>
                </span>{" "}
                Comment
              </button>
            </div>
            <div className="m-2">
              {item.comments.map((comment) => {
                return (
                  <h6 key={comment._id} className="font-light truncate">
                    <span className="mr-2 font-semibold">
                      {comment.postedBy.name}
                    </span>
                    {comment.text}
                  </h6>
                );
              })}
              {div && (
                <div className="flex justify-between border-opacity-50">
                  <input
                    className=" focus:outline-none border-none focus:border-gray-400 rounded-full"
                    type="text"
                    size={9}
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="bg-indigo-400 p-3 rounded-xl"
                    onClick={() => makeCommentCall(comment, item._id)}
                  >
                    comment
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Home;
