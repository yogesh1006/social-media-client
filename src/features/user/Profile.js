import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "./userSlice";

const Profile = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [image, setImage] = useState("");
  const { user } = useSelector(userSelector);

  const fetchAllUserPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/api/get_user_posts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      let data = await response.json();
      setAllPosts(data.data);
    } catch (e) {
      console.log("Error", e.response.data);
    }
  };
  useEffect(() => {
    fetchAllUserPosts();
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "instagram");
      data.append("cloud_name", "pbu");
      fetch("https://api.cloudinary.com/v1_1/pbu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // setUrl(data.url)
          let res = axios.put(
            `${process.env.REACT_APP_BACKEND}/api/update_pic`,
            {
              pic: data.url,
            },
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchAllUserPosts();
    //  updatePic()
    // eslint-disable-next-line
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" flex flex-col items-center justify-center max-w-lg ">
        <div className="flex border-b-2 border-light-blue-500 ">
          <div className="profile-image">
            <img
              className="w-32 h-32 m-3 rounded-full border-gray-500 border-2"
              src={user.pic}
              alt=""
              width="384"
              height="512"
            />
           <div>
           <input
                type="file"
                className="ml-6 flex justify-center opacity-0 h-full w-full"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
           </div>
          </div>
          <div className="flex flex-col flex-grow ml-5 ">
            <div className="flex flex-row m-2">
              <h1 className="mr-4 text-3xl">{user.name}</h1>
            </div>
            <div className="flex flex-row my-auto">
              <div className="mr-2.5">
                <span className="font-semibold">{allPosts.length}</span> posts
              </div>
              <div className="mr-2.5">
                <span className="font-semibold">{user.followers.length}</span>{" "}
                followers
              </div>
              <div className="mr-2.5">
                <span className="font-semibold">{user.following.length}</span>{" "}
                following
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-around ">
          {allPosts.map((item, index) => {
            return (
              <img
                className="w-1/4 m-1"
                src={item.photo}
                alt={item.title}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
