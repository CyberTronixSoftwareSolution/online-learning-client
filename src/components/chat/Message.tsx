import React from 'react';
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface MessageProps {
  message: {
    role: string;
    text: string;
  };
}

const Message = ({ message }: MessageProps) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : ''} gap-2 items-start`}>
      <Avatar size={28} icon={<UserOutlined />} />
      <div className="flex flex-col w-full max-w-[600px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900">
            {message.role === 'user' ? 'You' : 'Bot'}
          </span>
          <span className="text-sm font-normal text-gray-500">{new Date().toLocaleTimeString()}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900">
          {message.text}
        </p>
      </div>
    </div>
  );
};

export default Message;
