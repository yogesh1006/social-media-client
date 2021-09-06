import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserPosts,
  getUser,
  profileSelector,
  uploadPic,
} from "./profileSlice";
import { userSelector } from "../user/userSlice";

const Profile = () => {
  const [image, setImage] = useState("");
  const { user } = useSelector(userSelector);
  const { profile, posts } = useSelector(profileSelector);
  const dispatch = useDispatch();
  // console.log(profile ,posts);

  useEffect(() => {
    if (user.token !== null) {
      (async function () {
        await dispatch(getUserPosts());
      })();
    }
    // eslint-disable-next-line
  }, [user.token]);

  useEffect(() => {
    if (user.token !== null) {
      (async function () {
        await dispatch(getUser());
      })();
    }
    // eslint-disable-next-line
  }, [user.token]);

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
          dispatch(uploadPic(data.url))
            .unwrap()
            .then((res) => {
              toast.success(res.data.message);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className=" flex flex-col items-center justify-center max-w-2xl">
        <div className="flex border-b-2 border-light-blue-500 ">
          <div className="profile-image">
            <img
              className="w-40 max-w-4 h-auto m-3 rounded-full object-cover border-gray-500 border-2"
              src={profile.pic}
              alt="profilepic"
            />
            <div>
              <input
                type="file"
                id="actual-btn"
                hidden
                onChange={(e) => updatePhoto(e.target.files[0])}
              />

              <label
                className="bg-blue-400 p-1 align-center"
                htmlFor="actual-btn"
              >
              Upload
              </label>
            </div>
          </div>

          <div className="flex flex-col flex-grow justify-start ml-5 ">
            <div className="flex flex-row p-2">
              <h1 className=" text-3xl">{user.name}</h1>
            </div>
            <div className="flex flex-row my-auto">
              <div className="mr-2.5">
                <span className="font-semibold">{posts.length}</span> posts
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
        <div className="mt-4 flex flex-row flex-wrap justify-start gap-1 md:gap-2">
          {posts.map((item, index) => {
            return (
              <img
                className="w-36 md:w-1/3"
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
