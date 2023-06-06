import React, { useState, FormEvent, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { TextField, Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useAppDispatch } from "../app/hooks";
import { addBlog, readBlog, addlike, watchblog } from "../action/blogAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { TypeBlog } from "../action/actionType";
const Blog = () => {
  const isauth = useSelector((state: RootState) => state.auth.isauth);
  const user = useSelector((state: RootState) => state.auth.user);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  let tmp = blogs;
  const [currentblog, setcurrentblog] = useState<TypeBlog>({
    title: "",
    _id: "",
    like: 0,
    watch: 0,
    user_name: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (!isauth) navigate("/login");
    dispatch(readBlog());
  }, []);

  const add_like = (id: string) => {
    dispatch(addlike(id));
  };

  const add_blg = (e: FormEvent) => {
    e.preventDefault();
    if (title != "" && content != "" && image != "") {
      const newblog = {
        title: title,
        content: content,
        user_name: user.name,
        image: image,
      };
      dispatch(addBlog(newblog));
      settitle("");
      setcontent("");
      setImageData("");
    }
  };

  const onwatch = (item: TypeBlog, id: string) => {
    dispatch(watchblog(id));
    setcurrentblog(item);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
  };

  return (
    <>
      <div className="text-center my-3">
        <button
          type="button"
          className="block mx-auto my-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div className="me-3">
            {/* <img
              className="h-8 w-8 rounded-full justify-center"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="">

            </img> */}
          </div>
          Create
        </button>
      </div>
      <div className=" m-auto mx-3 flex ">
        <div className="  h-screen">
          <div className="mx-auto flex flex-wrap ms-5 ps-2">
            {tmp.map((item, key) => {
              return (
                <>
                  <div key={key} className="">
                    {item.image !== "" && (
                      <div className="row-span-6 border-2 m-2  text-center p-2 bg-white">
                        {/* <span className="text-1xl text-green-400">
                          {" "}
                          The blog of{" "}
                        </span> */}

                        <span className="text-2xl text-black">
                          {item.user_name}
                        </span>

                        <img
                          src={`${item.image}`}
                          className="my-4 w-full h-60 m-auto"
                          alt={`${item.image}`}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                          onClick={(e) => onwatch(item, item._id)}
                        />
                        <div className="text-black text-2x1">{item.title}</div>
                        <div className="text-black text-1x1">
                          {item.content}
                        </div>
                        <VisibilityIcon className="text-black"></VisibilityIcon>
                        <span className="text-black">{item.watch}</span>
                        <ThumbUpIcon className="ms-10 text-black"></ThumbUpIcon>
                        <span className="text-black">{item.like}</span>
                        <>
                          <PlusOneIcon className="float-end"></PlusOneIcon>
                          <ThumbUpIcon
                            className="hover:cursor-pointer float-end  hover:cursor-pointer text-green-400"
                            onClick={(e) => add_like(item._id)}
                          >
                            <span></span>
                          </ThumbUpIcon>
                        </>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl w-screen bg-white p-30 opacity-90">
          <div className="grid grid-rows-3 grid-flow-col gap-4 shadow border-2 p-2 w-full">
            <div className="row-span-6 border-2 m-2  hover:cursor-pointer text-center p-2 ">
              <span className="text-2xl text-black-400">
                {/* The article of{" "} */}
                <span className="text-black-500">{currentblog.user_name}</span>
              </span>
              <img
                src={`${currentblog.image}`}
                className="my-4 w-full  m-auto "
                alt={`localhost:8000/${currentblog.image}`}
              />
            </div>

            <div className="col-span-1  border-2 m-2 p-1">
              {/* {currentblog.user_name}'article */}
              {/* <strong>Title</strong> */}
              {currentblog.title}
            </div>
            <div className="row-span-4 col-span-1  border-2 m-2">
              {currentblog.content}
            </div>
            <div className="col-span-1  border-2 m-2 text-center">
              <VisibilityIcon></VisibilityIcon>
              {currentblog.watch}
              <ThumbUpIcon className="ms-10"></ThumbUpIcon>
              {currentblog.like}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h1 className="modal-title " id="exampleModalLabel">
                Create Blog
              </h1>
            </div>
            <div className="modal-body flex w-full max-w-md space-x-3 mx-auto">
              <form onSubmit={add_blg}>
                <div className="mx-4 mt-4">
                  <label className="text">Title</label>
                  <TextField
                    className="w-full"
                    name="title"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                  <label className="text pt-3">Content</label>
                  <TextareaAutosize
                    className="border-blue-300 border-2 w-full my-3 p-3"
                    minRows="4"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                  ></TextareaAutosize>
                  <label className="text pt-1 pb-2">Address</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setimage(e.target.value)}
                    className="form-control border-black mb-2"
                    required
                  />
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      variant="contained"
                      className="ms-32 rounded"
                      onClick={add_blg}
                      data-bs-dismiss="modal"
                    >
                      Creat blog
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;
