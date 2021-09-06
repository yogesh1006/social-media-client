import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, postSelector, clearState } from "./postSlice";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "react-loader-spinner";

const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  console.log(props);
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(postSelector);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      toast.success("Post created successfully.");
      dispatch(clearState());
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isError, isSuccess]);

  useEffect(() => {
    if (url) {
      dispatch(
        createPost({
          title,
          body,
          pic: url,
        })
      );
    }
    // eslint-disable-next-line
  }, [url]);

  const postDetails = () => {
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="
     flex flex-col  p-6 max-w-2xl mx-auto mt-2 border border-gray-500 rounded-lg border-current"
    >
      <div className="flex justify-between items-center">
        <h4>Create New Post</h4>
        <button onClick={() => props.setPost(false)}>close</button>
      </div>

      <input
        className="mt-3"
        type="text"
        placeholder="Write something special about the post."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="mt-3"
        type="text"
        placeholder="What do you want to talk about?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        className="mt-3"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400"
        onClick={() => postDetails()}
      >
        Post
      </button>
      {isFetching && (
        <div className="flex flex-col justify-center items-center absolute inset-0 z-10">
          <Loader type="TailSpin" color="#00BFFF" height={70} width={70} />
        </div>
      )}
    </div>
  );
};

export default CreatePost;
