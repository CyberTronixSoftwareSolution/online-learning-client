import { InboxOutlined } from "@ant-design/icons";
const DataNotFound = (prop: { name: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <InboxOutlined style={{ fontSize: "50px" }} className="text-gray-400" />
      <p className="text-gray-500">No {prop.name} Found</p>
    </div>
  );
};

export default DataNotFound;
