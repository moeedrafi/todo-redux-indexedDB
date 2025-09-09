import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { initDB } from "./utils/db.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

initDB().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
});
