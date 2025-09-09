import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth);
  console.log(user);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-semibold">Todo List</h1>

      <input
        type="text"
        placeholder="todos..."
        className="w-md px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
      />

      <div className="space-y-4 max-w-md w-full overflow-y-auto mb-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <input type="checkbox" />
            <p>Drink Water</p>
          </div>
          <button
            type="button"
            className="py-1 px-2 rounded-lg bg-red-600 text-white"
          >
            Delete
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <input type="checkbox" />
            <p>Drink Water</p>
          </div>
          <button
            type="button"
            className="py-1 px-2 rounded-lg bg-red-600 text-white"
          >
            Delete
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <input type="checkbox" />
            <p>Drink Water</p>
          </div>
          <button
            type="button"
            className="py-1 px-2 rounded-lg bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
