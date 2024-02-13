import axios from "axios";
const url = `http://192.168.0.80:3000`;

export const registerUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${url}/auth/api/register`, {
      email,
      password,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${url}/auth/api/login`, {
      email,
      password,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};
