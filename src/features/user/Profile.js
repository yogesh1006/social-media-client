import React from "react";

const Profile = () => {
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
                <h1 className="mr-4 text-3xl">janedoe_</h1>

                <button className="ml-3 bg-gray-100 p-3 br-3 border-current">Edit Profile</button>
                </div>

                <div className="flex flex-row my-auto">
                    <div className="mr-2.5">
                    <span  className="font-semibold">164</span> posts
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
        <img className="w-50 m-1" src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""/>
        <img className="w-50 m-1" src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""/>
        <img className="w-50 m-1" src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""/>
        <img className="w-50 m-1" src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""/>
        <img className="w-50 m-1" src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""/>
        <img className="w-50 m-1" src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""/>

      </div>
    </div>
    </div>
  );
};

export default Profile;