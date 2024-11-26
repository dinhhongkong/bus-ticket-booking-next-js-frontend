'use client'
import { ProChat } from "@ant-design/pro-chat";
import { Modal } from "antd";
import { use, useEffect } from "react";

export default function PopupChat({isOpen}: {isOpen: boolean}) {
  
  return (
    <>
      <Modal
        title="Chatbot CSKH"
        style={{
          position:'absolute',
          top:20,
          right:20
    
        }}
      
        open={isOpen}
        mask={false}
        getContainer={false}
        footer={null}
      
      >
        <ProChat
          locale="en-US"
          style={{ height: "70vh" }}
          helloMessage={
            "Welcome to ProChat, I am your exclusive robot, this is our Github：[ProChat](https://github.com/ant-design/pro-chat)"
          }
          request={async (messages) => {
            const mockedData: string = `This is a simulated conversation data. ${messages.length} messages were passed in this session [Đăng nhập](http://localhost:3000/login)`;
            return new Response(mockedData);
          }}
        />
      </Modal>
    </>
  );
}
