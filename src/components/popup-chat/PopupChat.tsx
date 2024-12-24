'use client'
import { useChatBot } from "@/hooks/custom/ChatBotHook";
import { ProChat } from "@ant-design/pro-chat";
import { Modal } from "antd";
import { use, useEffect, useState } from "react";


export default function PopupChat({isOpen}: {isOpen: boolean}) {
  const {chats,setChats,deleteChatsFromLocalStorage, fetchAnswer } = useChatBot();
  
  
  return (
    <>
      <Modal
        title="Chatbot CSKH"
        style={{
          position:'absolute',
          top:20,
          right:20
    
        }}
        width={1100}

        open={isOpen}
        mask={false}
        getContainer={false}
        footer={null}
      
      >
        <ProChat
          locale="en-US"
          style={{ height: "70vh" }}
          helloMessage={
            "Xin chào quý khách, đây là trợ lý ảo của nhà xe Phương Trang, không biết quý khách có thắc mắc gì với dịch vụ ạ"
          }
          chats={chats}
          
          onChatsChange={(chats) => {
            setChats(chats)
          }}
          
          request={async (messages ) => {
            const response : string = await fetchAnswer(messages)
            return new Response(response);
          }}
        />
      </Modal>
    </>
  );
}
