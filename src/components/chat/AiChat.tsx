import { SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Input } from "antd";
import Message from "./Message";

interface AiChatProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

const AiChat = (prop: AiChatProps) => {
  return (
    <Drawer
      title="Feel free to ask anything"
      placement="right"
      width={500}
      onClose={() => {
        prop.setOpen(false);
      }}
      open={prop.open}
      footer={
        <div className="flex justify-center align-middle w-full gap-2">
          <Input placeholder="Message to AI" />
          <Button type="primary" icon={<SendOutlined rotate={270} />} />
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </Drawer>
  );
};

export default AiChat;
