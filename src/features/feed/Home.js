import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { userSelector } from "../user/userSlice";
import {feedSelector} from "../feed/feedSlice"
import { Link } from "react-router-dom";
import {getAllPosts ,likeHandler, unlikeHandler,deletePost,makeComment} from "./feedSlice";


const Home = () => {
  const [comment,setComment] = useState("")
  const { user } = useSelector(userSelector);
  const {posts} = useSelector(feedSelector);
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.token !== null) {      
      (async function () {        
        await dispatch(getAllPosts());        
      })();
    }
    // eslint-disable-next-line
  }, [user.token]);

  const likeHandlerCall = (id) => {
    dispatch(likeHandler(id))
  }

  const unlikeHandlerCall = (id) => {
    dispatch(unlikeHandler(id))
  }

  const deletePostCall = (postId) => {
    dispatch(deletePost(postId))
  }

  const makeCommentCall = (text,id) => {
    dispatch(makeComment({text,id}))
    setComment("")
  }




  return (
    <div>
      {posts.map((item, index) => {
        return (
          <div
            className="flex flex-col max-w-lg mx-auto mt-5 br-3 border-2"
            key={index}
          >
            <div className="flex justify-between items-center">
              <h5 className="p-2 font-bold"><Link to={item.postedBy._id !== user._id ? `/profile/${item.postedBy._id}` : "/profile"}>{item.postedBy.name}</Link></h5>
              {item.postedBy._id === user._id && (
                <i
                  className="fas fa-trash mr-3 cursor-pointer"
                  onClick={() => deletePostCall(item._id)}
                ></i>
              )}
            </div>

            <div>
              <img
                className="w-full h-80 object-cover max-w-full"
                src={item.photo}
                alt=""
              />
            </div>
            <div className="m-2">
              {item.likes.includes(user._id) ? (
                <i
                  className="far fa-thumbs-down fa-lg"
                  onClick={() => unlikeHandlerCall(item._id)}
                ></i>
              ) : (
                <i
                  className="far fa-thumbs-up fa-lg"
                  onClick={() => likeHandlerCall(item._id)}
                ></i>
              )}
              <h4>{item.likes.length} likes</h4>
              <h4 className="p-0 m-0"><span className="mr-2 font-semibold">{item.postedBy.name}</span>{item.title}</h4>
              <p className="p-0 m-0">{item.body}</p>
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
              <div className="flex justify-between border-4 border-light-blue-500 border-opacity-50">
                <input
                  className="focus:outline-none ring-0"
                  type="text"
                  placeholder="add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <i className="flex far fa-comment fa-lg items-center cursor-pointer" onClick={() => makeCommentCall(comment, item._id)}></i>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
