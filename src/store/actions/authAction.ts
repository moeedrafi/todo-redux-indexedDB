import type { User } from "../../utils/types";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const signup = () => ({ type: SIGNUP });

export const login = (user: Omit<User, "password">) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({ type: LOGOUT });
