import type { Todo } from "../../utils/types";
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "../actions/todoAction";

interface TodosState {
  todos: Todo[];
}

interface TodosAction {
  type: string;
  payload: any;
}

const initialState: TodosState = {
  todos: [],
};

export const todoReducer = (
  state: TodosState = initialState,
  action: TodosAction
): TodosState => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state };
    case TOGGLE_TODO:
      return { ...state };
    case DELETE_TODO:
      return { ...state };
    default:
      return state;
  }
};
