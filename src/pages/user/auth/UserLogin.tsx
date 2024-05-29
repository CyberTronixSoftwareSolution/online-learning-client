import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CustomToastService } from "../../../shared/message.service";
import { LocalStorageService } from "../../../shared/localStorage.service";
import { useAuth } from "../../../shared/context/AuthContext";
import { useLoading } from "../../../shared/context/LoadingContext";
import { useState } from "react";

interface UseLoginRequest {
  email: string;
  password: string;
}
const UserLogin = () => {
  const [formData, setFormData] = useState<UseLoginRequest>(
    {} as UseLoginRequest
  );
  const [errors, setErrors] = useState<any>({});

  const { axiosInstance } = useLoading();
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({} as any);
    }

    try {
      const response = await axiosInstance.post("/user/login", formData);

      if (response.data) {
        const user: any = response.data.user;
        user.role = "User";
        LocalStorageService.setUser(user);
        setUser(user);
        clearValues();
        CustomToastService.success("User logged in successfully!");
        navigate("/");
      }
    } catch (error: any) {
      CustomToastService.error(error.response.data.message);
    }
  };

  const clearValues = () => {
    setFormData({} as UseLoginRequest);
  };

  const validate = (data: UseLoginRequest) => {
    const errors: any = {};
    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center align-middle">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="w-full flex-1">
              <div className="mx-auto">
                <div className="flex flex-col justify-center align-middle text-center gap-2">
                  <h2 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl ">
                    Welcome to{" "}
                  </h2>
                  <span className="text-xl text-black dark:text-white">
                    <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-blue-600">
                      Coursera{" "}
                      <mark className="px-2 text-white bg-white rounded dark:bg-blue-600">
                        Learning
                      </mark>
                    </h1>
                  </span>
                </div>

                <div className="w-full mt-8">
                  <div className="form-horizontal w-3/4 mx-auto">
                    <div className="flex flex-col mt-4 gap-1">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Email
                      </label>

                      <Input
                        placeholder="Email"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200  text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {
                        <span className="text-red-600 text-xs">
                          {errors.email}
                        </span>
                      }
                    </div>
                    <div className="flex flex-col mt-4 gap-1">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-600"
                      >
                        Password
                      </label>

                      <Input.Password
                        placeholder="Password"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200  text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {
                        <span className="text-red-600 text-xs">
                          {errors.password}
                        </span>
                      }
                    </div>
                    <div className="flex flex-col mt-2 mb-2">
                      <button
                        className="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        onClick={onSubmit}
                      >
                        <span className="ml-3">Sign In</span>
                      </button>
                    </div>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Don&apos;t have an account?
                      <Link to="/signUp">
                        <span className="text-blue-600 font-semibold ml-1">
                          Sign Up
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
