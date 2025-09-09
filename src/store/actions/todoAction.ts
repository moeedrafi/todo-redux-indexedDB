import type { Todo } from "../../utils/types";

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const addTodo = (todo: Todo) => ({ type: ADD_TODO, payload: todo });

export const toggleTodo = (id: string) => ({ type: TOGGLE_TODO, payload: id });

export const deleteTodo = (id: string) => ({ type: DELETE_TODO, payload: id });
