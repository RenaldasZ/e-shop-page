import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
};

const Users = {
  getUsers: () => requests.get("users"),
  registerUsers: (values: object) => requests.post("users", values),
};

const agent = {
  Users,
};

export default agent;
