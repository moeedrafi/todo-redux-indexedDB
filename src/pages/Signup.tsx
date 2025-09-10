import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Card } from "../components/Card";
import type { User } from "../utils/types";
import { hashPassword } from "../utils/helpers";
import { signup } from "../store/actions/authAction";
import { addData, findUser } from "../utils/db/auth";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const email = String(formData.get("email")).trim().toLowerCase();
    const plainPassword = String(formData.get("password") || "").trim();

    try {
      const password = await hashPassword(plainPassword);
      const existingUser = await findUser(email);
      if (existingUser) {
        alert("Already a user exists");
        throw new Error("Already a user exists");
      }

      const user: User = {
        id: crypto.randomUUID(),
        username,
        email,
        password,
        createdAt: Date.now(),
      };

      await addData(user);
      dispatch(signup());
      navigate("/login");
    } catch (error) {
      console.log("Signup error" + error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card
        header="Register"
        subHeading="Create an Account"
        to="/login"
        label="Already have an account? Login"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="johndoe.com"
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="on"
              placeholder="john@doe.com"
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <button
            type="submit"
            className="mb-5 w-full p-2 font-semibold rounded-lg bg-black hover:bg-black/80 text-white"
          >
            Register
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
