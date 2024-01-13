import {
  asyncThunkCreator,
  buildCreateSlice,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";

// const todos = JSON.parse(localStorage.getItem("todos")) || [];

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const todoSlice = createSliceWithThunks({
  name: "todos",
  initialState: {
    loading: false,
    todos: [],
    error: null,
  },
  reducers: (create) => ({
    deleteTodo: create.reducer((state, actions) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== actions.payload.id
      );
    }),
    addTodo: create.preparedReducer(
      (todo) => {
        const newTodo = { id: nanoid(), title: todo.title, isCompleted: false };
        return { payload: newTodo };
      },
      (state, actions) => {
        state.todos.push(actions.payload);
      }
    ),
    editTodo: create.reducer((state, actions) => {
      const { id, title } = actions.payload;
      const editTodo = state.todos.find((todo) => todo.id === id);
      if (editTodo) {
        editTodo.title = title;
      }
    }),
    toggleTodo: create.reducer((state, actions) => {
      state.todos.map((todo) => {
        if (todo.id === actions.payload.id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
    }),
    // addTitle: create.reducer((state, actions) => {
    //   const newTodo = {
    //     id: nanoid(),
    //     title: actions.payload.title,
    //     isCompleted: false,
    //   };
    //   state.todos.push(newTodo);
    // }),
    deleteAll: create.reducer((state, actions) => {
      state.todos = [];
    }),
    fetchTodos: create.asyncThunk(
      async (_, thunkApi) => {
        const response = await fetch("http://localhost:5000/todos");
        return await response.json();
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, actions) => {
          state.error = actions.error;
          state.loading = false;
        },
        fulfilled: (state, actions) => {
          state.todos = actions.payload;
        },
      }
    ),
  }),
  // ----------------------------------------------------------------------------------------
  //                                    OLD METHOD
  // ----------------------------------------------------------------------------------------
  // reducers: {
  //   addTodo: (state, action) => {
  //     state.push(action.payload);
  //     // localStorage.setItem("todos", JSON.stringify(state));
  //   },
  //   deleteTodo: (state, action) => {
  //     // localStorage.setItem(
  //     //   "todos",
  //     //   JSON.stringify(state.filter((todo) => todo.id !== action.payload.id))
  //     // );
  //     // return (state = JSON.parse(localStorage.getItem("todos")));
  //     return (state = state.filter((todo) => todo.id !== action.payload.id));
  //   },
  //   deletAll: (state) => {
  //     // localStorage.setItem("todos", JSON.stringify((state = [])));
  //     return (state = []);
  //   },
  //   editTodo: (state, action) => {
  //     const { id, title } = action.payload;
  //     const editTodo = state.find((todo) => todo.id === id);
  //     if (editTodo) {
  //       editTodo.title = title;
  //     }
  //     // localStorage.setItem("todos", JSON.stringify(state));
  //   },
  //   toggleEdit: (state, action) => {
  //     const { id } = action.payload;
  //     const toggleTodo = state.find((todo) => todo.id === id);
  //     if (toggleTodo) {
  //       toggleTodo.isCompleted = !toggleTodo.isCompleted;
  //     }
  //     // localStorage.setItem("todos", JSON.stringify(state));
  //   },
  // },
});

export const {
  addTodo,
  deleteTodo,
  editTodo,
  deleteAll,
  toggleTodo,
  fetchTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
