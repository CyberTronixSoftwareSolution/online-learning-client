import {
  Input,
  Avatar,
  Button,
  Menu,
  Tooltip,
  Dropdown,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { MdOutlineCastForEducation } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import AiChat from "./chat/AiChat";
import { useAuth } from "../shared/context/AuthContext";
import { LocalStorageService } from "../shared/localStorage.service";
import { useLoading } from "../shared/context/LoadingContext";

const UserHeader = () => {
  const [searchPlaceHolder] = useState<string>("Search...");
  const [open, setOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});

  const { axiosInstance } = useLoading();
  const { authUser, setUser } = useAuth();

  const navigate = useNavigate();

  const logout = () => {
    navigate("/signIn");
    setUser({} as any);
    LocalStorageService.removeUser();
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/user/get/${authUser?._id}`);
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
        <Link to="/userProfile">
          <a target="_blank" rel="noopener noreferrer">
            <UserOutlined /> Profile
          </a>
        </Link>
      </Menu.Item>

      <Popconfirm
        title="Logout Confirmation"
        description="Are you sure to logout?"
        onConfirm={logout}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
        placement="bottomLeft"
      >
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">
            <LogoutOutlined /> LogOut
          </a>
        </Menu.Item>
      </Popconfirm>
    </Menu>
  );
  return (
    <>
      <nav className="flex relative py-2 w-full bg-blue-500 shadow-dark-mild lg:py-4">
        <div className="flex flex-wrap justify-between items-center px-3 w-full">
          <span className="text-xl text-black dark:text-white">
            <h1 className="text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-2xl dark:text-white">
              Coursera{" "}
              <mark className="px-2 text-blue-600 bg-white rounded dark:bg-white">
                Learning
              </mark>
            </h1>
          </span>
          <div className="flex gap-2 justify-end items-center">
            <Link to="/">
              <Tooltip placement="bottom" title={"Home"}>
                <Button
                  type="text"
                  shape="circle"
                  icon={<HomeOutlined />}
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </Tooltip>
            </Link>

            <Tooltip placement="bottom" title={"Ask From AI"}>
              <Button
                type="text"
                shape="circle"
                icon={<MessageOutlined />}
                style={{ color: "white" }}
                onClick={() => {
                  setOpen(true);
                }}
              />
            </Tooltip>
            <Input
              placeholder={searchPlaceHolder}
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              className="mr-2 ml-2 rounded-full"
            />
            <Link to="/userModule">
              <Tooltip placement="bottom" title={"Courses"}>
                <Button
                  type="text"
                  shape="circle"
                  icon={<MdOutlineCastForEducation />}
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </Tooltip>
            </Link>
          </div>

          {authUser?._id ? (
            <Dropdown overlay={menu} placement="bottomLeft">
              {userData?.image ? (
                <Avatar size="large" src={userData?.image} />
              ) : (
                <Avatar size="large" icon={<UserOutlined />} />
              )}
            </Dropdown>
          ) : (
            <Link to="/signIn">
              <Button
                className="rounded-full"
                style={{
                  fontWeight: "bold",
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>

      <AiChat open={open} setOpen={setOpen} />
    </>
  );
};

export default UserHeader;
