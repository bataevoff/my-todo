import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./TodoReducer";

const store = configureStore({
  reducer: {
    todos: UserReducer,
  },
});

export default store;
