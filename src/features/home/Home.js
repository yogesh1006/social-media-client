import React, { useEffect, useState } from "react";

const Home = () => {
  const [allPosts,setAllPosts] = useState([])

  useEffect(() => {
    const fetchAllPosts = async ()=>{
    try {
      const response = await fetch(
        'http://localhost:5000/api/get_all_posts',
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
  fetchAllPosts()

  },[])



  return (
    <div className="br-4">
      {allPosts.map((item,index) => {
        return (
          <div className="flex flex-col max-w-lg mx-auto mt-5 br-3 border-current" key={index}>
          <h5 className="p-2">{item.postedBy.name}</h5>
          <div>
            <img
            className="w-full h-80 object-cover"
              src={item.photo}
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
            <h4 className="p-2">{item.title}</h4>
            <p className="p-2">{item.body}</p>
            <input className="p-2 border-none" type="text" placeholder="add a comment" />
          </div>
        </div>
        )
      })}
     
    </div>
  );
};

export default Home;
