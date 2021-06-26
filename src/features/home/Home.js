import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../user/userSlice";
import axios from "axios";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts);
  const { user } = useSelector(userSelector);
  // console.log(user);
  // const [comment, setComment] = useState('')

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
       const res = await axios.put("http://localhost:5000/api/add_comment",
       {
         comment:text,
         postId:id
       },{
         headers:{
           authorization:localStorage.getItem('token')
         }
       })
       console.log(res.data.data);
       fetchAllPosts()
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="br-4">
      {allPosts.map((item, index) => {
        // console.log(item);
        return (
          <div
            className="flex flex-col max-w-lg mx-auto mt-5 br-3 border-current"
            key={index}
          >
            <h5 className="p-2">{item.postedBy.name}</h5>
            <div>
              <img
                className="w-full h-80 object-cover"
                src={item.photo}
                alt=""
              />
            </div>
            <div>
              {item.likes.includes(user._id) ? (
                <i
                  className="far fa-thumbs-down"
                  onClick={() => unlikeHandler(item._id)}
                ></i>
              ) : (
                <i
                  className="far fa-thumbs-up"
                  onClick={() => likeHandler(item._id)}
                ></i>
              )}
              <h4>{item.likes.length} likes</h4>
              <h4 className="p-2">{item.title}</h4>
              <p className="p-2">{item.body}</p>
              {
                item.comments.map(comment => {
                  return (
                    <h6 key={comment._id}><span className="font-semibold">{comment.postedBy.name}</span>{comment.text}</h6>
                  )
                })
              }
              <form onSubmit={(e)=> {
                e.preventDefault();
                makeComment(e.target.value, item._id)
              }}>
              <input
                className="p-2 border-none"
                type="text"
                placeholder="add a comment"
              />
              </form>
            
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
