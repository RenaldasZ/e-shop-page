import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
};

const Users = {
  loginUser: (values: object) => requests.post("login/", values),
  registerUser: (values: object) => requests.post("users/", values),
};

const Catalog = {
  getAllProducts: () => requests.get(`products/?page_size=100`),
  getSingleProduct: (id: string) => requests.get(`products/${id}`),
};

const agent = {
  Users,
  Catalog,
};

export default agent;
