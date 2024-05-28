import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/auth/UserLogin";
import UserSignUp from "./pages/user/auth/UserSignUp";
import UserProfile from "./pages/user/auth/UserProfile";

const App = () => {
  const [userType] = useState<string>("");

  return (
    <>
      <Routes>
        {userType === "User" || userType === "" ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/signIn" element={<UserLogin />} />
            <Route path="/signUp" element={<UserSignUp />} />
            <Route path="/userProfile" element={<UserProfile />} />
            {/* <Route path="/userJob" element={<JobPage />} />
            <Route path="/userCourse" element={<CoursePage />} />
            />
            <Route path="/userService" element={<ServicePage />} />
            <Route path="/userChat" element={<ChatPage />} />
            <Route path="/userNetwork" element={<NetworkPage />} /> */}
          </Route>
        ) : userType === "Admin" ? (
          <Route element={<AdminLayout />}>{/* Add Amin ROutes */}</Route>
        ) : (
          <>
            {/*  
            <Route path="/admin/signUp" element={<AdminSignUp />} />
            <Route path="/admin" element={<AdminLoginPage />} /> */}

            {/* Add General Routes */}
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
