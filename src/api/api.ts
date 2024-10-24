import { axiosClient } from "./axiosClient";

export const get = async (url: string) => {
  const response = await axiosClient.get(url);
  return response.data;
};

export const post = async (url: string, data: any) => {
  const response = await axiosClient.post(url, data);
  return response.data;
};

export const put = async (url: string, data: any) => {
  const response = await axiosClient.put(url, data);
  return response.data;
};

export const del = async (url: string) => {
  const response = await axiosClient.delete(url);
  return response.data;
};
