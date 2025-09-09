import { LOGIN, LOGOUT, SIGNUP } from "../actions/authAction";

interface PublicUser {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

interface AuthState {
  isAuthenticated: boolean;
  user: PublicUser | null;
}

type AuthAction =
  | { type: "SIGNUP" } // no payload
  | { type: "LOGIN"; payload: PublicUser }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, isAuthenticated: false };
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
