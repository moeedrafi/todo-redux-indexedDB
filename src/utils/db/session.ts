import { initDB } from "./index";

export const getSession = async (): Promise<string | null> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - getSession");
    const transaction = db.transaction("session", "readonly");
    const store = transaction.objectStore("session");
    const request = store.get("currentUser");

    request.onsuccess = () => {
      const result = request.result as
        | { key: string; userId: string }
        | undefined;
      resolve(result ? result.userId : null);
    };
    request.onerror = () => reject(request.error);
  });
};

export const setSession = async (userId: string): Promise<string> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - setSession");
    const transaction = db.transaction("session", "readwrite");
    const store = transaction.objectStore("session");
    const request = store.put({ key: "currentUser", userId });

    request.onsuccess = () => resolve(userId);
    request.onerror = () => reject(request.error);
  });
};

export const clearSession = async (): Promise<void> => {
  const db = await initDB();

  return new Promise((resolve, reject) => {
    console.log("request.onsuccess - clearSession");
    const transaction = db.transaction("session", "readwrite");
    const store = transaction.objectStore("session");
    const request = store.delete("currentUser");

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
