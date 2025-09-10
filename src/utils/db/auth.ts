import type { User } from "../types";
import { initDB } from "./index";

export const addUser = async (data: User): Promise<void> => {
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

export const removeUser = async (id: number): Promise<void> => {
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

export const getUser = async (id: string): Promise<User | null> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - getUser");
    const transaction = db.transaction("auth", "readonly");
    const store = transaction.objectStore("auth");
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
};
