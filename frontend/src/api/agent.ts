import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, auth = false) => axios.get(url, { withCredentials: auth }).then(responseBody),
  post: (url: string, body: object, auth = false) =>
    axios.post(url, body, { withCredentials: auth }).then(responseBody),
};

const Users = {
  loginUser: (values: object) => requests.post("login/", values, true),
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
