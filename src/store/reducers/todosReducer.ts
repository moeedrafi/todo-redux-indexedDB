import type { Todo } from "../../utils/types";
import {
  ADD_TODO,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_TODO,
} from "../actions/todoAction";

interface TodosState {
  todos: Todo[];
}

type TodosAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "SET_TODO"; payload: Todo[] }
  | { type: "DELETE_TODO"; payload: string };

const initialState: TodosState = {
  todos: [],
};

export const todoReducer = (
  state: TodosState = initialState,
  action: TodosAction
): TodosState => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case SET_TODO:
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};
