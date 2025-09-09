import { useDispatch } from "react-redux";
import { Card } from "../components/Card";
import { addData, hashPassword } from "../utils/db";
import { signup } from "../store/actions/authAction";

const Signup = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") || "").trim();
    const email = String(formData.get("email") || "")
      .trim()
      .toLowerCase();
    const plainPassword = String(formData.get("password") || "");
    const password = await hashPassword(plainPassword);

    const user = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      createdAt: Date.now(),
    };

    try {
      await addData(user);
      dispatch(signup());
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
