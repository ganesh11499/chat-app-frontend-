import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type FormData = {
  userName: string;
  email: string;
  password: string;
};

type Errors = {
  userName?: string;
  email?: string;
  password?: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  //Handle input changes
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (e.target.value) {
      setFormData((pre) => ({
        ...pre,
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
    if (!formData.userName) newErrors.userName = "User name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  //Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const res = await axios.post("http://localhost:3500/user/addUser", formData);

      if (res.status == 201) {
        navigate('/')
        console.log("Form Data:", formData);
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
            Register
          </h1>
          {/* user name */}
          <div>
            <label className="input input-bordered flex items-center gap-2 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="userName"
                onChange={handleFormChange}
                placeholder="Username"
              />
            </label>
            {errors.userName && (
              <small className="text-red-600">{errors.userName}</small>
            )}

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
            {errors.email && (
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
                className="grow"
                name="password"
                onChange={handleFormChange}
                // value="password"
              />
            </label>
            {errors.password && (
              <small className="text-red-600">{errors.password}</small>
            )}

            <button className="flex items-center justify-center ml-auto mr-auto mt-4 btn btn-sm btn-primary w-[100%]">
              Register
            </button>

            <p className="flex items-center justify-center mt-4">
              Already have an account ?{" "}
              <span className="text-primary underline mx-2" onClick={() => navigate('/')}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
