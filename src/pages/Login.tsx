import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Card } from "../components/Card";
import type { User } from "../utils/types";
import { findUser } from "../utils/db/auth";
import { hashPassword } from "../utils/helpers";
import { login } from "../store/actions/authAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email")).trim().toLowerCase();
    const plainPassword = String(formData.get("password") || "").trim();

    try {
      const hashedPassword = await hashPassword(plainPassword);
      const existingUser = await findUser(email);

      if (!existingUser) {
        alert("User not exists");
        throw new Error("User not exists");
      }
      if (existingUser.password !== hashedPassword) {
        alert("Incorrect Password");
        throw new Error("Incorrect Password");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = existingUser;

      dispatch(login(user as Omit<User, "password">));
      navigate("/");
    } catch (error) {
      console.log("LOGIN ERROR", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card
        header="Login"
        subHeading="Welcome Back"
        to="/signup"
        label="Don't have an account? Register"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
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

export default Login;
