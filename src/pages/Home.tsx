import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store/store";
import {
  addTodo,
  removeTodo,
  setTodos,
  toggleTodo,
} from "../store/actions/todoAction";
import { deleteTodo, fetchTodos, postTodo, toggle } from "../utils/db/todos";
import type { Todo } from "../utils/types";

const Home = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");

  const state = useSelector((state: RootState) => state);
  console.log(state);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo = {
      id: crypto.randomUUID(),
      title: input,
      completed: false,
    };

    try {
      await postTodo(todo);
      dispatch(addTodo(todo));

      const todos = await fetchTodos();
      setTodos(todos);
    } catch (error) {
      console.log("ADD TODO", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      dispatch(removeTodo(id));
    } catch (error) {
      console.log("TODO DELETE", error);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await toggle(updatedTodo);
      dispatch(toggleTodo(todo.id));
    } catch (error) {
      console.log("TODO DELETE", error);
      dispatch(toggleTodo(todo.id));
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos();
      dispatch(setTodos(todos));
    };

    getTodos();
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-semibold">Todo List</h1>

      <form onSubmit={handleSubmit} className="space-x-3">
        <input
          type="text"
          placeholder="todos..."
          onChange={(e) => setInput(e.target.value.trim())}
          className="w-md px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
        />
        <button
          type="submit"
          className="px-2 py-2 bg-black text-white rounded-lg"
        >
          Add
        </button>
      </form>

      <div className="space-y-4 max-w-md w-full overflow-y-auto mb-5">
        {state.todo.todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              <p>{todo.title}</p>
            </div>

            <button
              type="button"
              onClick={() => handleDelete(todo.id)}
              className="py-1 px-2 rounded-lg bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
