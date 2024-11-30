import { get, post } from "@/api/api";
import { useNotificationContext } from "@/context/NotificationContextProvider";
import { ChatMessage } from "@ant-design/pro-chat";
import { use, useEffect, useState } from "react";

export const useChatBot = () => {
  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>([]);
  const { notify } = useNotificationContext();

  const [isInitialLoad, setIsInitialLoad] = useState(true); // Cờ để kiểm soát lần tải đầu tiên

  useEffect(() => {
    const storedChats = getChatsFromLocalStorage();
    setChats(storedChats);
    setIsInitialLoad(false);
  }, []);
  
  useEffect(() => {
    if (!isInitialLoad) {
      saveChatsToLocalStorage();
    }
  }, [chats]);

  const fetchAnswer = async (messages: any) => {
    try {
      const response: string = await post(`/ai/chat`, messages);
      return response;
    } catch (error: any) {
      notify.error(
        "Lỗi khi truy vấn đến chat bot, quý khách vui lòng thử lại sau ít phút"
      );
      return "Lỗi khi truy vấn đến chat bot, quý khách vui lòng thử lại sau ít phút";
    }
    return "";
  };

  const saveChatsToLocalStorage = () => {
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  };

  const getChatsFromLocalStorage = (): ChatMessage<Record<string, any>>[] => {
    const data = localStorage.getItem("chatHistory");
    return data ? JSON.parse(data) : [];
  };

  const deleteChatsFromLocalStorage = () => {
    localStorage.removeItem("chatHistory");
  };



  return {chats,setChats,deleteChatsFromLocalStorage, fetchAnswer };
};
