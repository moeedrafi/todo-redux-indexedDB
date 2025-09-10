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
