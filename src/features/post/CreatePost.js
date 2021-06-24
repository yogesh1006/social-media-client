import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, postSelector, clearState } from "./postSlice";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    postSelector
  );


  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      toast.success("Post created successfully.")
      dispatch(clearState());
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isError, isSuccess]);

  useEffect(() => {
    if(url) {
    dispatch(createPost({
      title,
      body,
      pic: url,
    }))
  }
  },[url])

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
        {isFetching && "Posting..."}
      </div>
    </div>
  );
};

export default CreatePost;
