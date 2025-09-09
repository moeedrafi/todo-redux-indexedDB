import { Card } from "../components/Card";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card
        header="Login"
        subHeading="Welcome Back"
        to="/signup"
        label="Don't have an account? Register"
      >
        <form className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="johndoe.com"
              className="px-3 py-2 rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
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
