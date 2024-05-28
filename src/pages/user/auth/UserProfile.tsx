import { Avatar, Button, Popconfirm, Progress } from "antd";
import {
  LogoutOutlined,
  EditOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ProgressProps } from "antd";
const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

const UserProfile = () => {
  return (
    <div className="px-3 py-1">
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
                Nimna Thiranjaya
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-500">
                  <PhoneOutlined /> 070 3002769
                </span>

                <span className="text-sm font-semibold text-gray-500">
                  <MailOutlined /> nimnathiranjaya@gmail.com
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

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 mb-6">
        <div
          className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl col-span-2"
          style={{ height: "350px" }}
        >
          <div className="p-6 flex justify-between items-center">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Previous Exam Results
            </h5>
          </div>
          <div className="px-6 py-2">
            <div className="overflow-hidden overflow-y-scroll"></div>
          </div>
        </div>

        <div
          className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl "
          style={{ height: "350px" }}
        >
          <div className="p-6 flex justify-between items-center">
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Performance
            </h5>
          </div>
          <div className="px-6 py-2">
            <div className="flex justify-center align-middle">
              <Progress
                type="dashboard"
                steps={10}
                percent={75}
                trailColor="rgba(0, 0, 0, 0.06)"
                strokeWidth={20}
                size={180}
              />
            </div>

            <div className="flex justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500">
                  Current Stage
                </span>
                <span className="text-2xl font-bold text-black">
                  Intermediate
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500">
                  Total Points
                </span>
                <span className="text-2xl font-bold text-black text-right">
                  200
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
