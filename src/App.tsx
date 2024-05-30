import { useEffect, useState } from "react";
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
import { Spin } from "antd";
import { useLoading } from "./shared/context/LoadingContext";
import { useAuth } from "./shared/context/AuthContext";

const App = () => {
  const [userType, setUserType] = useState<string>("User");
  const { authUser } = useAuth();

  const { loading } = useLoading();

  useEffect(() => {
    if (authUser) {
      setUserType(authUser?.role);
    } else {
      setUserType("");
    }
  }, [authUser]);

  return (
    <>
      <Spin
        spinning={loading}
        size="large"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2000,
        }}
      >
        <Routes>
          {userType === "User" ? (
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
              <Route element={<UserLayout />}>
                <Route path="/" element={<UserHome />} />
                <Route path="/signIn" element={<UserLogin />} />
                <Route path="/signUp" element={<UserSignUp />} />
              </Route>
              <Route path="/admin/signUp" element={<AdminSignUp />} />
              <Route path="/admin" element={<AdminLogin />} />
              {/* Add General Routes */}
            </>
          )}
        </Routes>
      </Spin>
    </>
  );
};

export default App;
