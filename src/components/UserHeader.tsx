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
import { useState } from "react";
import AiChat from "./chat/AiChat";

const UserHeader = () => {
  const [searchPlaceHolder] = useState<string>("Search...");
  const [open, setOpen] = useState<boolean>(false);
  const [userId] = useState<string>("sdc");

  const navigate = useNavigate();

  const logout = () => {
    navigate("/signIn");
  };

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
      <nav className="relative flex w-full bg-zinc-50 py-2 shadow-dark-mild dark:bg-blue-500 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <span className="text-xl text-black dark:text-white">
            <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl dark:text-white">
              Coursera{" "}
              <mark className="px-2 text-blue-600 bg-white rounded dark:bg-white">
                Learning
              </mark>
            </h1>
          </span>
          <div className="flex items-center justify-end gap-2">
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
              className="rounded-full ml-2 mr-2"
            />
            <Link to="/userCourse">
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

          {userId ? (
            <Dropdown overlay={menu} placement="bottomLeft">
              <Avatar size="large" icon={<UserOutlined />} />
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
