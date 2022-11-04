//eslint-disable-next-line no-unused-vars
import axios from "axios";

// let Api = axios.create({
//   baseURL: "http://192.168.100.79:8000/api"
// });

// Api.defaults.withCredentials = true;

let BaseApi = axios.create({
    //baseURL: "http://127.0.0.1:8000/api"
   baseURL: "http://api.msafar.ma/api"
});

let Api = function() {
  let token = localStorage.getItem('token');

  if (token) {
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return BaseApi;
};

export default Api;
