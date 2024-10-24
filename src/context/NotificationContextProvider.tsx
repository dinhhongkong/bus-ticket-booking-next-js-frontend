'use client'
import React, { createContext, useContext } from 'react';
import { notification } from 'antd';

interface NotificationContextType {
  notify: {
    success: (description: string) => void;
    error: (description: string) => void;
    info: (description: string) => void;
    warning: (description: string) => void;
  };
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);


export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = {
    success: (description: string) => {
      api.success({
        message: 'Success',
        description,
        // style: { backgroundColor: '#4caf50' }
      });
    },
    error: (description: string) => {
      api.error({
        message: 'Error',
        description,
        // style: { backgroundColor: '#f44336', color: 'white' }, // Màu đỏ cho error
      });
    },
    info: (description: string) => {
      api.info({
        message: 'Info',
        description,
        // style: { backgroundColor: '#ffffff', color: 'white' }, // Màu trắng cho info
      });
    },
    warning: (description: string) => {
      api.warning({
        message: 'Warning',
        description,
        // style: { backgroundColor: '#ffe100', color: 'white' }, // Màu cam cho warning
      });
    },
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};


export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }
  return context;
};