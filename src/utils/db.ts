export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("myDB", 1);

    request.onupgradeneeded = () => {
      const db = request.result;

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

    request.onsuccess = () => {
      const db = request.result;
      const version = db.version;

      console.log("request.onsuccess - initDB", version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(data: T): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("myDB");

    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      const db = request.result;
      const transaction = db.transaction("auth", "readwrite");
      const store = transaction.objectStore("auth");
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;

      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const getStoreData = <T>(): Promise<T[]> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("myDB");

    request.onsuccess = () => {
      console.log("request.onsuccess - getStoreData");
      const db = request.result;
      const transaction = db.transaction("auth", "readonly");
      const store = transaction.objectStore("auth");
      const res = store.getAll();

      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const hashPassword = async (password: string) => {
  const encoded = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  const bytes = Array.from(new Uint8Array(buffer));

  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
};
