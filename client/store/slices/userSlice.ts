import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },

  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
    },
    logoutUser: (state) => {
      state.user = "";
    },
  },
});

export const logoutUser = userSlice.actions.loginUser;
export const loginUser = userSlice.actions.logoutUser;
export default userSlice.reducer;
