import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Message = () => {
  return (
    <div className={`flex flex-col gap-1 items-start`}>
      {/* flex-row-reverse */}
      <div className="flex items-start gap-2.5">
        <Avatar size={28} icon={<UserOutlined />} />
        <div className="flex flex-col w-full max-w-[600px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl ">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900">
              Coursera AI
            </span>
            <span className="text-sm font-normal text-gray-500">11:46</span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900">
            That's awesome. I think our users will really appreciate the
            improvements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
