import React, { useState, FormEvent, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { AppDispatch } from "../app/store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useAppDispatch } from "../app/hooks";
import { deleteBlog, editBlog } from "../action/blogAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { readBlog } from "../action/blogAction";
import { TextareaAutosize } from "@mui/material";

const MyBlog = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [currentEdit, setcurrentEdit] = useState({
    image: "",
    title: "",
    content: "",
    _id: "",
  });
  useEffect(() => {
    dispatch(readBlog());
  }, []);

  const del = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
    if (window.confirm()) {
      dispatch(deleteBlog(id));
    }
  };

  const edit_blog = (e: FormEvent) => {
    e.preventDefault();
    if (
      currentEdit.image != "" &&
      currentEdit.title != "" &&
      currentEdit.content != ""
    ) {
      dispatch(editBlog(currentEdit));
    }
  };

  return (
    <>
      <div className=" max-w-5xl m-auto flex">
        <div className=" w-full h-screen my-3">
          {blogs.map((item, key) => {
            return (
              <>
                {item.user_name == user.name && (
                  <div className="grid grid-rows-3 grid-flow-col gap-4 shadow border-2 p-2">
                    {item.image !== "" && (
                      <div className="row-span-6 border-2 m-2">
                        <img
                          src={`${item.image}`}
                          className="my-4 w-full  m-auto"
                          alt={`${item.image}`}
                        />
                      </div>
                    )}
                    <div className="col-span-1  border-2 m-2 p-1">
                      {/* {item.user_name}'article */}
                      <strong>Title: </strong>
                      {item.title}
                    </div>
                    <div className="row-span-4 col-span-1  border-2 m-2">
                      {item.content}
                    </div>
                    <div className="col-span-1  border-2 m-2 text-center">
                      <VisibilityIcon className="ms-4"></VisibilityIcon>
                      {item.watch}
                      <ThumbUpIcon className="ms-3"></ThumbUpIcon>
                      {item.like}
                      {/* <EditIcon
                        className="hover:cursor-pointer mx-3 text-yellow-400"
                        onClick={(e) => setcurrentEdit(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      ></EditIcon> */}
                      <div className="flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 hover:cursor-pointer mx-3 "
                          onClick={(e) => del(e, item._id)}
                          // onClick={(e) => setcurrentEdit(item)}
                          // data-bs-toggle="modal"
                          // data-bs-target="#exampleModal"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={(e) => setcurrentEdit(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>

                        {/* <DeleteForeverIcon
                          className="hover:cursor-pointer text-red-600"
                          onClick={(e) => setcurrentEdit(item)}
                        ></DeleteForeverIcon> */}
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Blog
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={edit_blog}>
                <div className="mx-4 mt-6">
                  <TextField
                    className="w-full"
                    name="title"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    value={currentEdit.title}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <TextareaAutosize
                    className="border-red-300 border-2 w-full my-3 p-3"
                    name="content"
                    minRows="4"
                    value={currentEdit.content}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></TextareaAutosize>
                  <input
                    name="image"
                    type="url"
                    value={currentEdit.image}
                    onChange={(e) =>
                      setcurrentEdit({
                        ...currentEdit,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="form-control"
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    className="ms-32"
                    onClick={edit_blog}
                    data-bs-dismiss="modal"
                  >
                    Update blog
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyBlog;
