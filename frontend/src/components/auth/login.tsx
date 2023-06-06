import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TextField} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../action/authAction";
import { TypeLoginData } from "../../action/actionType";

const Login = () => {
  const [userdata, setuserdata] = useState<TypeLoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(userdata, navigate));
    setuserdata({ ...userdata, email: "", password: "" });
  };

  return (
    <>
      <div className="w-1/4 m-auto mt-10 ">
        <form onSubmit={onsubmit} className="shadow borderpt-3">
          <h2 className="mt-5 pt-2 pe-4 ps-9 text-center text-2xl font-bold leading-9 tracking-tight text-black-900">
            Login
          </h2>
          <div className=" m-6">
            <label htmlFor="email"> Email </label>
            <TextField
              className="w-full"
              name="email"
              id="outlined-basic"
              label="Email:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className=" m-6">
            <label htmlFor="email"> Password </label>
            <TextField
              className="w-full"
              name="password"
              type="password"
              id="outlined-basic"
              label="Password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          {/* <p className="mt-10 text-center text-sm text-gray-500 ps-6 pe-3">
          Not a member?
         <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"></a>
         </p> */}
          <button
            type="submit"
            className="w-full  flex justify-center  my-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
