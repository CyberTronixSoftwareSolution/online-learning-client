import { Avatar, Button, Popconfirm } from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";

const AdminProfilePage = () => {
  const logout = () => {};
  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div className="px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* {loggedInUser?.image != "" ? (
              <Avatar
                size={64}
                src={<img src={loggedInUser?.image} alt="avatar" />}
              />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )} */}
            <Avatar size={64} icon={<UserOutlined />} />

            <div className="flex flex-col">
              <div className="text-xl font-bold leading-none tracking-tight text-black md:text-3xl lg:text-2xl dark:text-black">
                NImna Perera
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-500">
                  <PhoneOutlined /> 0703002768
                </span>

                <span className="text-sm font-semibold text-gray-500">
                  <MailOutlined /> nimnaperera@gmail.com
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="primary" icon={<EditOutlined />} ghost>
              Edit Profile
            </Button>
            <Popconfirm
              title="Logout Confirmation"
              description="Are you sure to logout?"
              onConfirm={logout}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
              placement="bottomLeft"
            >
              <Button type="primary" danger icon={<LogoutOutlined />} ghost>
                LogOut
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfilePage;
