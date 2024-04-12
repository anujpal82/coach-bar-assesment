import { API_SERVER } from "../config/constant";
import axios from "axios";


class AuthApi {
  static Login = (data) => {
    return axios.post(`${API_SERVER}auth/sign-in`, data);
  };
  static Signup = (data,token) => {
    return axios.post(`${API_SERVER}auth/sign-up`, data,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
  };


}

export default AuthApi;
