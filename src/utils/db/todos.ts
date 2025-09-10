import { initDB } from "./index";
import type { Todo } from "../types";

export const fetchTodos = async (): Promise<Todo[]> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - getTodos");

    const transaction = db.transaction("todos", "readonly");
    const store = transaction.objectStore("todos");
    const result = store.getAll();

    result.onsuccess = () => resolve(result.result);
    result.onerror = () => reject(result.error);
  });
};

export const toggle = async (updatedTodo: Todo): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - toggleTODO", updatedTodo);
    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.put(updatedTodo);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const deleteTodo = async (id: string): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - removeTodo", id);
    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const postTodo = async (data: Todo): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - addTodo", data);
    const transaction = db.transaction("todos", "readwrite");
    const store = transaction.objectStore("todos");
    const request = store.add(data);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
