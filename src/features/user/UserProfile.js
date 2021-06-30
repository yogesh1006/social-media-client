import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();
  //   console.log(userId);
  //   console.log(profile);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get_userprofile/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      //   console.log(response);
      setProfile(response.data);
    } catch (e) {
      console.log("Error", e.response.data);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line
  }, []);

  const followUser = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/follow",
        {
          followId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      fetchUserProfile();
    } catch (e) {
      console.log("Error", e.response.data);
    }
  };

  return (
    <>
      {profile ? (
        <div className="flex flex-col justify-center items-center">
          <div className=" flex flex-col items-center justify-center max-w-lg ">
            <div className="flex border-b-2 border-light-blue-500 ">
              <div className="profile-image">
                <img
                  className="w-32 h-32 m-3 rounded-full border-gray-500 border-2"
                  src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
                  alt=""
                  width="384"
                  height="512"
                />
              </div>
              <div className="flex flex-col flex-grow ml-5 ">
                <div className="flex flex-row m-2">
                  <h1 className="mr-4 text-3xl">{profile.user.name}</h1>

                  <button className="ml-3 bg-gray-100 p-3 br-3 border-current">
                    Edit Profile
                  </button>
                </div>

                <div className="flex flex-row my-auto">
                  <div className="mr-2.5">
                    <span className="font-semibold">
                      {profile.posts.length}
                    </span>{" "}
                    posts
                  </div>
                  <div className="mr-2.5">
                    <span className="font-semibold">188</span> followers
                  </div>
                  <div className="mr-2.5">
                    <span className="font-semibold">206</span> following
                  </div>
                </div>

                <div className="flex my-auto">
                  <button onClick={followUser} className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400">
                    Follow
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-around ">
              {profile.posts.map((item, index) => {
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
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default UserProfile;
