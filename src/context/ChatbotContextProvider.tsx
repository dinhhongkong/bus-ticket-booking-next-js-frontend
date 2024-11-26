'use client'
import { useState, useEffect, useContext } from 'react';
import React from 'react';
import PopupChat from '@/components/popup-chat/PopupChat';
import { FloatButton, message } from 'antd';
import { WechatOutlined } from '@ant-design/icons';


export const ChatbotContext = React.createContext({ message: ""});

export const ChatBotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  

  return (
    <ChatbotContext.Provider value={{ message }}>
      {children}
      <PopupChat isOpen={isOpen} />
      <FloatButton
        onClick={() => setIsOpen((prev) => !prev)}
        icon={<WechatOutlined style={{ fontSize: "25px" }} />}
        description="Chatbot"
        shape="circle"
        style={{
          width: "70px",
          height: "70px",
          fontSize: "24px",
          backgroundColor: "#fb923c",
        }}
      />
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
