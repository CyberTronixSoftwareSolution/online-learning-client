import { LuUsers2 } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useLoading } from "../../shared/context/LoadingContext";
import { useAuth } from "../../shared/context/AuthContext";

const { Sider } = Layout;

interface SideBarProp {
  collapsed: boolean;
}

const SideBar = (prop: SideBarProp) => {
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(0);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const { axiosInstance } = useLoading();
  const { authUser } = useAuth();

  useEffect(() => {
    const pathArr = path.split("/");
    if (pathArr.includes("admin") && pathArr.includes("users")) {
      setDefaultSelectedKeys(1);
    } else if (pathArr.includes("admin") && pathArr.includes("profile")) {
      setDefaultSelectedKeys(3);
    } else if (pathArr.includes("admin") && pathArr.includes("dashboard")) {
      setDefaultSelectedKeys(0);
    } else if (pathArr.includes("admin") && pathArr.includes("admins")) {
      setDefaultSelectedKeys(2);
    }
  }, [defaultSelectedKeys, path]);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/admin/get/${authUser?._id}`);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useMemo(() => {
    if (authUser) {
      getUser();
    }
  }, [authUser]);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={prop.collapsed}
      style={{
        padding: "0 10px 0 10px",
        width: "250px",
      }}
    >
      {prop.collapsed ? (
        <>
          {user.image ? (
            <Avatar size={40} src={user.image} className="mt-4 mb-5" />
          ) : (
            <Avatar size={40} icon={<UserOutlined />} className="mt-4 mb-5" />
          )}
        </>
      ) : (
        <>
          {/* Add avatar and logged user name  */}
          <div className="flex items-center flex-col mt-4 mb-5">
            {user?.image ? (
              <Avatar size={60} src={user?.image} />
            ) : (
              <Avatar size={40} icon={<UserOutlined />}></Avatar>
            )}
            <div className="text-base font-bold leading-none tracking-tight text-white mt-5 mb-2">
              {user?.name}
            </div>

            <div className="w-full h-0.5 bg-gray-600 mt-3"></div>
          </div>
        </>
      )}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[defaultSelectedKeys.toString()]}
        items={[
          {
            key: "0",
            icon: <AiOutlineDashboard style={{ fontSize: "1.2rem" }} />,
            label: "Dashboard",
            onClick: () => {
              navigate("/admin/dashboard");
            },
          },
          {
            key: "1",
            icon: <LuUsers2 style={{ fontSize: "1.2rem" }} />,
            label: "Users",
            onClick: () => {
              navigate("/admin/users");
            },
          },
          {
            key: "2",
            icon: <LuUsers2 style={{ fontSize: "1.2rem" }} />,
            label: "Admins",
            onClick: () => {
              navigate("/admin/admins");
            },
          },
          {
            key: "3",
            icon: <UserOutlined style={{ fontSize: "1.2rem" }} />,
            label: "Profile",
            onClick: () => {
              navigate("/admin/profile");
            },
          },
        ]}
      />
    </Sider>
  );
};

export default SideBar;
