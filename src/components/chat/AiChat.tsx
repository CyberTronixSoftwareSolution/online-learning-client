import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { SendOutlined } from "@ant-design/icons";
import { Button, Drawer, Input } from "antd";
import Message from "./Message";

interface AiChatProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

// Move API key to environment variable for security
const apiKey = 'AIzaSyDmoLDZk54pWHBZmHSxcH7y5UI-w1gxIUY';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
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
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

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
      const responseMessage = { role: 'model', text: await result.response.text() };

      setMessages([...messages, { role: 'user', text: input }, responseMessage]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
      } else {
        alert('An unknown error occurred');
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
        <div className="flex justify-center align-middle w-full gap-2">
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
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Drawer>
  );
};

export default AiChat;
