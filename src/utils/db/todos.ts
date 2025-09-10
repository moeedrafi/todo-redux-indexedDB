import { initDB } from "./index";
import type { Todo } from "../types";

export const getTodos = async (): Promise<Todo[]> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - getStoreData");

    const transaction = db.transaction("todo", "readonly");
    const store = transaction.objectStore("todo");
    const result = store.getAll();

    result.onsuccess = () => resolve(result.result);
    result.onerror = () => reject(result.error);
  });
};

export const toggleTodo = async (updatedTodo: Todo): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - toggleTODO", updatedTodo);
    const transaction = db.transaction("todo", "readwrite");
    const store = transaction.objectStore("todo");
    const request = store.put(updatedTodo);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
