import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./redux/AuthSlice";
import { useDispatch } from "react-redux";

type FormData = {
  email: string;
  password: string;
};

type Errors = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [errors, setErrors] = useState<Errors>();

  //handle input changes
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (e.target.value) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  //Validate the form
  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  //login api function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
    } else {
      const res = await axios.post(
        "http://localhost:3500/user/logIn",
        formData
      );

      if (res.status == 201) {
        const user = {
          id: res.data.id,
          email: res.data.email,
          name: res.data.name,
        };

        const token = res.data.token;

        dispatch(login({ user, token }));
        console.log("From Data :", formData);

        navigate("/home");
      } else {
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ml-auto mr-auto">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="border border-black  rounded-lg px-12 py-8"
        >
          <h1 className="flex items-center justify-center my-2 text-2xl text-primary">
            Log In
          </h1>

          <div>
            {/* email */}
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="email"
                onChange={handleFormChange}
                placeholder="Email"
              />
            </label>

            {errors?.email && (
              <small className="text-red-600">{errors.email}</small>
            )}

            {/* password */}
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleFormChange}
                className="grow"
                // value="password"
              />
            </label>

            {errors?.password && (
              <small className="text-red-600">{errors.password}</small>
            )}

            <button className="flex items-center justify-center ml-auto mr-auto mt-4 btn btn-sm btn-primary w-[100%]">
              Login
            </button>

            <p className="flex items-center justify-center mt-4">
              Don't have an account ?{" "}
              <span
                className="text-primary underline mx-2"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
