import React from "react";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col max-w-lg mx-auto mt-5">
        <h5 className="p-2">Yogesh</h5>
        <div>
          <img
          className="w-full h-80 object-cover"
            src="https://images.unsplash.com/photo-1624024212112-4acdc689b511?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h4 className="p-2">title</h4>
          <p className="p-2">body</p>
          <input className="p-2 border-none" type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
