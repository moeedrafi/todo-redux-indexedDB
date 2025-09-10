import { combineReducers, createStore } from "redux";
import { authReducer } from "./reducers/authReducer";
import { todoReducer } from "./reducers/todosReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
