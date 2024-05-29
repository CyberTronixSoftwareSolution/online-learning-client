import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/auth/UserLogin";
import UserSignUp from "./pages/user/auth/UserSignUp";
import UserProfile from "./pages/user/auth/UserProfile";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminSignUp from "./pages/admin/auth/AdminSignUp";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import AdminProfilePage from "./pages/admin/auth/AdminProfilePage";

const App = () => {
  const [userType] = useState<string>("Admin");

  return (
    <>
      <Routes>
        {userType === "User" || userType === "" ? (
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/signIn" element={<UserLogin />} />
            <Route path="/signUp" element={<UserSignUp />} />
            <Route path="/userProfile" element={<UserProfile />} />
          </Route>
        ) : userType === "Admin" ? (
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
          </Route>
        ) : (
          <>
            <Route path="/admin/signUp" element={<AdminSignUp />} />
            <Route path="/admin" element={<AdminLogin />} />
            {/* Add General Routes */}
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
