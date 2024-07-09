import { axios } from "@/utils/axios";

export const getUser = async (userId: string) => {
  const rsp = await axios.get(`user/${userId}`);
  return rsp.data;
};

export const getAllUser = async () => {
  const rsp = await axios.get(`user`);
  return rsp.data;
};

export const signup = async (data: any) => {
  const rsp = await axios.post(`user/signup`, data);
  return rsp.data;
};
export const signOut = async (userId: string) => {
  const rsp = await axios.post(`auth/signout/${userId}`);
  return rsp;
};

export const signIn = async (data: any) => {
  const rsp = await axios.post(`auth/login`, data);
  return rsp.data;
};

export const getBlogs = async () => {
  const rsp = await axios.get(`blog`);
  return rsp.data;
};

export const createBlog = async (data: any) => {
  const rsp = await axios.post(`blog`, data);
  return rsp.data;
};

export const getBlog = async (id: number) => {
  const rsp = await axios.get(`blog/${id}`);
  return rsp.data;
};

export const getMyBlogs = async () => {
  const rsp = await axios.get(`blog/findUserBlogs/`);
  return rsp.data;
};

export const updateBlog = async (data: any) => {
  const rsp = await axios.patch(`blog/updateBlog/${data.id}`, data);
  return rsp.data;
};

export const deleteBlog = async (blogId: number) => {
  const rsp = await axios.delete(`blog/deleteBlog/${blogId}`);
  return rsp;
};

export const getProfile = async () => {
  const rsp = await axios.get(`user/profile`);
  return rsp.data;
};

export const updateUser = async (data: any) => {
  const rsp = await axios.patch(`user/${data.id}`, data);
  return rsp.data;
};

export const deleteUser = async (userId: number) => {
  const rsp = await axios.delete(`user/${userId}`);
  return rsp.data;
};
