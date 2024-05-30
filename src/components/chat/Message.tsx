import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BsRobot } from "react-icons/bs";
import React from "react";

interface MessageProps {
  message: {
    role: string;
    text: string;
  };
  userData: any;
}

const Message = ({ message, userData }: MessageProps) => {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "flex-row-reverse" : ""
      } gap-2 items-start`}
    >
      {message.role === "user" ? (
        <>
          {userData?.image ? (
            <Avatar size={28} src={userData?.image} />
          ) : (
            <Avatar size={28} icon={<UserOutlined />} />
          )}
        </>
      ) : (
        <Avatar size={28} icon={<BsRobot />} />
      )}
      <div
        className={`flex flex-col w-full max-w-[600px] leading-1.5 p-4 ${
          message.role === "user"
            ? "border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl"
            : "border-blue-200 bg-blue-100 rounded-e-xl rounded-es-xl"
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900">
            {message.role === "user" ? "You" : "Bot"}
          </span>
          <span className="text-sm font-normal text-gray-500">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
