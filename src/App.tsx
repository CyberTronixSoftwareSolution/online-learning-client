import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/auth/UserLogin";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const [userType] = useState<string>("User");

  return (
    <>
      <Routes>
        {userType === "User" ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHome />} />
            {/* <Route path="/userJob" element={<JobPage />} />
            <Route path="/userCourse" element={<CoursePage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userService" element={<ServicePage />} />
            <Route path="/userChat" element={<ChatPage />} />
            <Route path="/userNetwork" element={<NetworkPage />} /> */}
          </Route>
        ) : userType === "Admin" ? (
          <Route element={<AdminLayout />}>{/* Add Amin ROutes */}</Route>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signIn" element={<UserLogin />} />
            {/*  <Route path="/signUp" element={<UserSignUp />} />
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
