import { useState, useRef, useEffect, useMemo } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Input } from "antd";
import Message from "./Message";
import { useAuth } from "../../shared/context/AuthContext";
import { useLoading } from "../../shared/context/LoadingContext";
import { BsRobot } from "react-icons/bs";

interface AiChatProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

// Move API key to environment variable for security
const apiKey = "AIzaSyDmoLDZk54pWHBZmHSxcH7y5UI-w1gxIUY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const AiChat = (props: AiChatProps) => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<any>(null);

  const { axiosInstance } = useLoading();
  const { authUser } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useMemo(async () => {
    try {
      const response = await axiosInstance.get(`/user/get/${authUser?._id}`);
      if (response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [useAuth]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsSending(true);

    try {
      const updatedHistory = messages.map((msg) => ({
        parts: [{ text: msg.text }],
        role: msg.role,
      }));

      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: updatedHistory,
      });

      const result = await chatSession.sendMessage(input);
      const responseMessage = {
        role: "model",
        text: await result.response.text(),
      };

      setMessages([
        ...messages,
        { role: "user", text: input },
        responseMessage,
      ]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Drawer
      title="Feel free to ask anything"
      placement="right"
      width={650}
      onClose={() => {
        props.setOpen(false);
      }}
      open={props.open}
      footer={
        <div className="flex gap-2 justify-center w-full align-middle">
          <Input
            placeholder="Message to AI"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={sendMessage}
          />
          <Button
            type="primary"
            icon={<SendOutlined rotate={270} />}
            onClick={sendMessage}
            loading={isSending}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        {messages.length === 0 && <ChatMessageNotFound />}
        {messages.map((message, index) => (
          <Message key={index} message={message} userData={userData} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Drawer>
  );
};

export default AiChat;

const ChatMessageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <BsRobot style={{ fontSize: "100px" }} className="text-gray-400" />
      <div className="mt-2 w-96 text-center">
        <p className="text-sm text-center text-gray-500">
          I'm Cosera Learning Artifical Interligent Assistant, Feel free to ask
          anything from me!
        </p>
      </div>
    </div>
  );
};
