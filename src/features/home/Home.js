import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../user/userSlice";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  console.log(allPosts);
  const { user } = useSelector(userSelector);
  console.log(user);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/get_all_posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token")
            },
          }
        );
        let data = await response.json();
        // console.log(data.data);
        setAllPosts(data.data);
      } catch (e) {
        console.log("Error", e.response.data);
      }
    };
    fetchAllPosts();
  }, []);

  const likeHandler = async (id) => {
    try {
      const response = fetch("http://localhost:5000/api/like_post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          postId: id,
        }),
      });
      let result = await response.json();
      console.log(result);
      const newData = allPosts.map((item) => {
        if (item._id === result._id) {
          return result;
        } else {
          return item;
        }
      });
      setAllPosts(newData);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const unlikeHandler = (id) => {
    fetch("http://localhost:5000/api/unlike_post", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = allPosts.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setAllPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="br-4">
      {allPosts.map((item, index) => {
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
              {item.likes.includes(user._id) ? 
                <i className="far fa-thumbs-down" onClick={() => unlikeHandler(item._id)}></i>
               : <i className="far fa-thumbs-up" onClick={() => likeHandler(item._id)} ></i>
              }
              <h4>{item.likes.length} likes</h4>
              <h4 className="p-2">{item.title}</h4>
              <p className="p-2">{item.body}</p>
              <input
                className="p-2 border-none"
                type="text"
                placeholder="add a comment"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
