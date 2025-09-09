import type { User } from "../../utils/types";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const signup = (user: User) => ({ type: SIGNUP, payload: user });

export const login = (user: User) => ({ type: LOGIN, payload: user });

export const logout = () => ({ type: LOGOUT });
