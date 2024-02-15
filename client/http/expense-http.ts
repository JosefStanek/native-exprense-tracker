import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

const url = "https://expense-tracker-backend-rjsz.onrender.com/";

interface formData {
  amount: string;
  name: string;
  payment: { key: string; value: string };
  type: { key: string; value: string };
  userId: string;
  expenseId: string;
}

export const postExpense = async (data: formData) => {
  try {
    const res = await axios.post(`${url}/expense/api`, data);
    await queryClient.invalidateQueries({ queryKey: ["total"] });
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
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const getCategoryList = async (user: string, category: string) => {
  try {
    const res = await axios.get(`${url}/expense/api/${user}/${category}`);
    return res.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const deleteExpense = async (id: string) => {
  try {
    const res = await axios.delete(`${url}/expense/api/${id}`);
    await queryClient.invalidateQueries({ queryKey: ["category"] });
    await queryClient.invalidateQueries({ queryKey: ["total"] });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const updateExpenseItem = async (data: formData) => {
  try {
    const res = await axios.patch(
      `${url}/expense/api/${data.userId}/item/${data.expenseId}`,
      data
    );
    await queryClient.invalidateQueries();
    return res.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};

export const getExpenseItem = async (user: string, itemId: string) => {
  try {
    const res = await axios.get(`${url}/expense/api/${user}/item/${itemId}`);
    return res.data.item;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.error;
    } else {
      return "An unexpected error occurred";
    }
  }
};
