import { createSlice } from "@reduxjs/toolkit";

type reduxState = {
  user: string;
};

const initialState: reduxState = {
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
    },
    logoutUser: (state) => {
      state.user = "";
    },
  },
});

export const loginUser = userSlice.actions.loginUser;
export const logoutUser = userSlice.actions.logoutUser;
export default userSlice.reducer;
