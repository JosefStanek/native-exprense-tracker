import { createSlice } from "@reduxjs/toolkit";

type reduxState = {
  user: string;
};

const initialState: reduxState = {
  user: "test@test.cz",
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

export const logoutUser = userSlice.actions.loginUser;
export const loginUser = userSlice.actions.logoutUser;
export default userSlice.reducer;
