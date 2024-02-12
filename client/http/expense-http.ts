import axios from "axios";
const url = "http://192.168.0.80:3000";

interface formData {
  amount: string;
  name: string;
  payment: string;
  type: string;
  userId: string;
}

export const postExpense = async (data: formData) => {
  try {
    const res = await axios.post(`${url}/expense/api`, data);
    return res.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const getTotal = async (user: string) => {
  try {
    const res = await axios.get(`${url}/expense/api/${user}`);
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
