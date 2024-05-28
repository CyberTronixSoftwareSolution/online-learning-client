import { Input } from "antd";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center items-center ">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="hidden lg:flex lg:w-1/2 xl:w-5/12 bg-green-100">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz')",
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
                <form className="form-horizontal w-3/4 mx-auto">
                  <div className="flex mt-4 gap-2">
                    <div className="flex flex-col gap-1 w-full">
                      <Input
                        placeholder="Name"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        name="name"
                        id="name"
                      />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <Input
                        placeholder="Email"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        name="email"
                        id="email"
                      />
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
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <Input
                        placeholder="Phone"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        name="phone"
                        id="phone"
                        type="number"
                        min={1}
                      />
                    </div>
                  </div>

                  <div className="flex mt-4 gap-3">
                    <div className="flex flex-col gap-1 w-full">
                      <Input.Password
                        placeholder="Password"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        name="password"
                        id="password"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <Input.Password
                        placeholder="Confirm Password"
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        name="confirmPassword"
                        id="confirmPassword"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mt-2 mb-2">
                    <button className="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
