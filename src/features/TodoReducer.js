import { createSlice } from "@reduxjs/toolkit";

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoSlice = createSlice({
  name: "todos",
  initialState: todos,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      localStorage.setItem(
        "todos",
        JSON.stringify(state.filter((todo) => todo.id !== action.payload.id))
      );
      return (state = JSON.parse(localStorage.getItem("todos")));
    },
    deletAll: (state) => {
      localStorage.setItem("todos", JSON.stringify((state = [])));
      return (state = []);
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const editTodo = state.find((todo) => todo.id === id);
      if (editTodo) {
        editTodo.title = title;
      }
      localStorage.setItem("todos", JSON.stringify(state));
    },
    toggleEdit: (state, action) => {
      const { id } = action.payload;
      const toggleTodo = state.find((todo) => todo.id === id);
      if (toggleTodo) {
        toggleTodo.isCompleted = !toggleTodo.isCompleted;
      }
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export const { addTodo, deleteTodo, editTodo, toggleEdit, deletAll } =
  todoSlice.actions;
export default todoSlice.reducer;
