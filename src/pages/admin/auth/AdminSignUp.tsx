import { AnyObject } from "antd/es/_util/type";
import { useState } from "react";
import { Link } from "react-router-dom";

// interface AdminLoginRequest {
//   email: string;
//   password: string;
// }

const AdminSignUp = () => {
  const [formData, setFormData] = useState<AnyObject>({});
  const [errors] = useState<AnyObject>({});

  const handleChange = (e: AnyObject) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  return (
    <>
      {/* {loading && <CustomLoading />} */}
      <div className="bg-gray-50 font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
            <span className="flex justify-center  text-xl text-black dark:text-white">
              <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-blue-600">
                Coursera{" "}
                <mark className="px-2 text-white bg-white rounded dark:bg-blue-600">
                  Learning
                </mark>
              </h1>
            </span>
            <form className="mt-10 space-y-2">
              {/* First Name and Last Name */}
              <div>
                <label className="text-sm font-medium required">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Ful Name"
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && (
                  <div className="text-red-500 text-xs">{errors.name}</div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium required">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="Email address"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium required">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Phone Number"
                    id="phone"
                    onChange={handleChange}
                    onInput={(e: AnyObject) =>
                      (e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 12))
                    }
                    value={formData.phone}
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-xs">{errors.phone}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium required">Type</label>
                  <select
                    name="type"
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    id="type"
                    onChange={handleChange}
                    value={formData.type}
                  >
                    <option value="0">Select Type</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Employee">Employee</option>
                    <option value="Businessman">Businessman</option>
                  </select>
                  {errors.type && (
                    <div className="text-red-500 text-xs">{errors.type}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium required">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {
                    <div className="text-red-500 text-xs">
                      {errors.password}
                    </div>
                  }
                </div>
                <div>
                  <label className="text-sm font-medium required">
                    Confirm Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm px-2 py-2 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  />
                  {
                    <div className="text-red-500 text-xs">
                      {errors.confirmPassword}
                    </div>
                  }
                </div>
              </div>
              <div className="!mt-10">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-center">
                <p className="text-sm"> Don&apos;t have an account?</p>
                &nbsp;
                <Link to="/admin">
                  <a className="text-blue-600 hover:text-blue-700">Sign up</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignUp;
