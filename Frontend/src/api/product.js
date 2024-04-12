import axios from "axios";
import { API_SERVER } from "../config/constant";

export default class ProductApi {
  static updateProduct = (data, token) => {
    return axios.put(`${API_SERVER}product/${data?._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  static deleteProduct = (id, token) => {
    return axios.delete(`${API_SERVER}product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  static createProduct = (data, token) => {
    return axios.post(`${API_SERVER}product/create-product`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  static getUsers = (token) => {
    return axios.get(`${API_SERVER}user/user-lookup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  static getProducts = (token, search, category, source) => {
    return axios.get(
      `${API_SERVER}product/get-all-products?search=${search}&category=${JSON.stringify(
        category
      )} &source=${source}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
}
