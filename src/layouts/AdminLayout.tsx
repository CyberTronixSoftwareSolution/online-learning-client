import { useEffect, useMemo, useState } from "react";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  theme,
  Breadcrumb,
  Menu,
  Dropdown,
  Avatar,
} from "antd";
import SideBar from "../components/sidebar/sidebar.tsx";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLoading } from "../shared/context/LoadingContext.tsx";
import { useAuth } from "../shared/context/AuthContext.tsx";
import { LocalStorageService } from "../shared/localStorage.service.ts";
const { Header, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [breadcrumbItem, setBreadcrumbItem] = useState<React.ReactNode[]>([]);
  const [pageTitle, setPageTitle] = useState<string>("Dashboard");
  const [userData, setUserData] = useState<any>({});
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const { axiosInstance } = useLoading();
  const { authUser, setUser } = useAuth();

  const path = location.pathname;

  useEffect(() => {
    const pathArr = path.split("/");
    if (pathArr.includes("admin") && pathArr.includes("users")) {
      setBreadcrumbItem([<Breadcrumb.Item key="user">Users</Breadcrumb.Item>]);
      setPageTitle("Users Management");
    } else if (pathArr.includes("admin") && pathArr.includes("profile")) {
      setBreadcrumbItem([
        <Breadcrumb.Item key="profile">Profile</Breadcrumb.Item>,
      ]);
      setPageTitle("Profile");
    } else if (pathArr.includes("admin") && pathArr.includes("dashboard")) {
      setBreadcrumbItem([
        <Breadcrumb.Item key="dashboard">Dashboard</Breadcrumb.Item>,
      ]);
      setPageTitle("Dashboard");
    }
  }, [path]);

  const logout = () => {
    navigate("/admin");
    LocalStorageService.removeUser();
    setUser({} as any);
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/admin/get/${authUser?._id}`);
      if (response.data) {
        setUserData(response.data);
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

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/admin/profile">
          <a target="_blank" rel="noopener noreferrer">
            <UserOutlined /> Profile
          </a>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            logout();
          }}
        >
          <LogoutOutlined /> LogOut
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideBar collapsed={collapsed} />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={
                collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "20px",
                width: 64,
                height: 64,
              }}
            />
            <div className="mr-3">
              <Dropdown overlay={menu} placement="bottomLeft">
                {userData?.image ? (
                  <Avatar size="large" src={userData?.image} />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
              </Dropdown>
            </div>
          </div>
        </Header>
        <div className="flex justify-between items-center">
          <h1
            style={{
              margin: "16px 24px",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {pageTitle}
          </h1>
          <Breadcrumb style={{ margin: "16px 24px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {breadcrumbItem}
          </Breadcrumb>
        </div>
        <Content
          style={{
            margin: "0px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
