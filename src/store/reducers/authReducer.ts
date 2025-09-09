import type { User } from "../../utils/types";
import { LOGIN, LOGOUT, SIGNUP } from "../actions/authAction";

interface AuthState {
  isAutenticated: boolean;
  user: User | null;
}

interface AuthAction {
  type: string;
  payload: any;
}

const initialState: AuthState = {
  isAutenticated: false,
  user: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, isAutenticated: false };
    case LOGIN:
      return { ...state, isAutenticated: true };
    case LOGOUT:
      return { ...state, isAutenticated: false };
    default:
      return state;
  }
};
