import type { Todo, User } from "./types";

const DATABASE_NAME = "myDB";
const DB_VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("auth")) {
        console.log("creating auth store");
        const authStore = db.createObjectStore("auth", { keyPath: "id" });
        authStore.createIndex("email", "email", { unique: true });
      }

      if (!db.objectStoreNames.contains("todos")) {
        console.log("creating auth store + creating todos store");

        db.createObjectStore("todos", { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addData = async (data: User): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - addData", data);
    const transaction = db.transaction("auth", "readwrite");
    const store = transaction.objectStore("auth");
    const request = store.add(data);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const removeData = async (id: number): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - addData", id);
    const transaction = db.transaction("auth", "readwrite");
    const store = transaction.objectStore("auth");
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// TODOS functions
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

export const hashPassword = async (password: string) => {
  const encoded = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  const bytes = Array.from(new Uint8Array(buffer));

  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const findUser = async (email: string): Promise<User | null> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - finduseremail");
    const transaction = db.transaction("auth", "readonly");
    const store = transaction.objectStore("auth");
    const index = store.index("email");
    const request = index.get(email);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
};
