import React, { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");



  const postDetails = () => {
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","instagram")
      data.append("cloud_name","pbu")
      fetch("https://api.cloudinary.com/v1_1/pbu/image/upload",{
          method:"post",
          body:data
      })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          setUrl(data.url)
      })
      .catch((err) => {
          console.log(err);
      })
  }

  return (
    <div>
      <div className="flex flex-col max-w-lg mx-auto mt-5">
        <h4>Create New Post</h4>
        <input
          className="mt-3"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="mt-3"
          type="text"
          placeholder="Enter body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          className="mt-3"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400" onClick={() => postDetails()}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
