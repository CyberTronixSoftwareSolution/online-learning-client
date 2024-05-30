import { Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../../../shared/context/LoadingContext";
import { AnyObject } from "antd/es/_util/type";
import { CustomToastService } from "../../../shared/message.service";
// import CustomLoading from "../../../components/loading/CustomLoading";

interface UserSignUpRequest {
  name: string;
  email: string;
  age: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const UserSignUp = () => {
  const [formData, setFormData] = useState<UserSignUpRequest>(
    {} as UserSignUpRequest
  );
  const [errors, setErrors] = useState<UserSignUpRequest>(
    {} as UserSignUpRequest
  );

  const handleChange = (e: AnyObject) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { axiosInstance } = useLoading();
  const navigate = useNavigate();

  // Sign up user
  const onSubmit = async (e: AnyObject) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({} as UserSignUpRequest);
    }

    if (formData.password !== formData.confirmPassword) {
      CustomToastService.warning(
        "Password and confirm password should be same!"
      );
      return;
    }

    try {
      console.log(formData);
      const response = await axiosInstance.post("/user/register", formData);
      if (response.data) {
        CustomToastService.success(response.data.message);
        clear();
        navigate("/signIn");
      }
    } catch (error: any) {
      CustomToastService.error(error?.response?.data?.message);
    }
  };

  // Clear form data
  const clear = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  // sign up user Validation
  const validate = (data: UserSignUpRequest) => {
    const errors = {} as UserSignUpRequest;
    if (!data.name || data.name === "") {
      errors.name = "Name is required";
    }

    if (!data.age || data.age === "") {
      errors.age = "Age is required";
    } else if (parseInt(data.age) < 15 || parseInt(data.age) > 100) {
      errors.age = "Invalid age";
    }

    if (!data.phone || data.phone === "") {
      errors.phone = "Phone is required";
    }

    if (!data.email || data.email === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password || data.password === "") {
      errors.password = "Password is required";
    }

    if (!data.confirmPassword || data.confirmPassword === "") {
      errors.confirmPassword = "Password is required";
    }

    return errors;
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  return (
    <>
      {/* <CustomLoading /> */}
      <div className="bg-gray-100 text-gray-900 flex justify-center items-center ">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 bg-blue-100">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dd3v8dwin/image/upload/v1717094657/reg_afcjv1.png')",
              }}
            ></div>
          </div>
          <div className="flex-1 p-6 sm:p-12 lg:w-1/2 xl:w-7/12">
            <div className="flex flex-col items-center">
              <div className="w-full flex-1">
                <div className="text-center">
                  <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-blue-600">
                    <span className="text-black">Sign Up to {""}</span> Coursera{" "}
                    <mark className="px-2 text-white bg-white rounded dark:bg-blue-600">
                      Learning
                    </mark>
                  </h1>
                </div>

                <div className="w-full mt-8">
                  <div className="form-horizontal w-3/4 mx-auto">
                    <div className="flex mt-4 gap-2">
                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          placeholder="Name"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          name="name"
                          id="name"
                          onChange={handleChange}
                          value={formData.name}
                        />

                        {errors.name && (
                          <div className="text-red-500 text-xs">
                            {errors.name}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          placeholder="Email"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          name="email"
                          id="email"
                          onChange={handleChange}
                          value={formData.email}
                        />

                        {errors.email && (
                          <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex mt-4 gap-2">
                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          placeholder="Age"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          name="age"
                          id="age"
                          type="number"
                          min={1}
                          onChange={handleChange}
                          value={formData.age}
                        />

                        {errors.age && (
                          <div className="text-red-500 text-xs">
                            {errors.age}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          placeholder="Phone"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          name="phone"
                          id="phone"
                          type="number"
                          min={1}
                          onChange={handleChange}
                          value={formData.phone}
                          onInput={(e: any) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 12);
                          }}
                        />

                        {errors.phone && (
                          <div className="text-red-500 text-xs">
                            {errors.phone}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mt-4 gap-3">
                      <div className="flex flex-col gap-1 w-full">
                        <Input.Password
                          placeholder="Password"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          name="password"
                          id="password"
                          onChange={handleChange}
                          value={formData.password}
                        />

                        {errors.password && (
                          <div className="text-red-500 text-xs">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <Input.Password
                          placeholder="Confirm Password"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          name="confirmPassword"
                          id="confirmPassword"
                          onChange={handleChange}
                          value={formData.confirmPassword}
                        />

                        {errors.confirmPassword && (
                          <div className="text-red-500 text-xs">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 mb-2">
                      <button
                        className="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        onClick={onSubmit}
                      >
                        <span className="ml-3">Sign Up</span>
                      </button>
                    </div>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Already have an account?
                      <Link to="/signIn">
                        <span className="text-blue-600 font-semibold ml-1">
                          Sign In
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
