import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux"
import { userSelector } from "./userSlice";

const Profile = () => {
  const [allPosts,setAllPosts] = useState([])
  const {user} = useSelector(userSelector);

  // console.log(user);
  useEffect(() => {

    const fetchAllUserPosts = async ()=>{
    try {
      const response = await fetch(
        'http://localhost:5000/api/get_user_posts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
          }
        }
      );
      let data = await response.json();
      // console.log(data.data);
      setAllPosts(data.data)
    } catch (e) {
      console.log('Error', e.response.data);
    }
  }
  fetchAllUserPosts()

  },[])



  return (
      <div className="flex flex-col justify-center items-center">
    <div className=" flex flex-col items-center justify-center max-w-lg ">
      <div className="flex border-b-2 border-light-blue-500 ">
        <div className="profile-image">
          <img
           className="w-32 h-32 m-3 rounded-full border-gray-500 border-2"
            src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
            alt=""
            width="384" height="512"
          />
        </div>
        <div className="flex flex-col flex-grow ml-5 ">

                <div className="flex flex-row m-2">
                <h1 className="mr-4 text-3xl">{user.name}</h1>

                <button className="ml-3 bg-gray-100 p-3 br-3 border-current">Edit Profile</button>
                </div>

                <div className="flex flex-row my-auto">
                    <div className="mr-2.5">
                    <span  className="font-semibold">{allPosts.length}</span> posts
                    </div>
                    <div className="mr-2.5">
                    <span  className="font-semibold">188</span> followers
                    </div>
                    <div className="mr-2.5">
                    <span className="font-semibold">206</span> following
                    </div>
                </div>

                <div className="flex my-auto">
                <p>
                    <span className="font-semibold">Jane Doe</span> Lorem ipsum dolor
                    sit, amet consectetur adipisicing elit{" "}
                </p>
                </div>
           </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-around ">
        {allPosts.map((item,index) => {
          return (  
           <img className="w-1/4 m-1" src={item.photo} alt={item.title} key={index}/>
          )
        })}
      </div>
    </div>
    </div>
  );
};

export default Profile;
