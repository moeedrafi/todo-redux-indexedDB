import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { getSession } from "../utils/db/session";
import { getUser } from "../utils/db/auth";
import { login } from "../store/actions/authAction";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const restoreAuth = async () => {
      const userId = await getSession();
      if (!userId) return;

      const existingUser = await getUser(userId);
      if (existingUser) {
        const { id, username, email, createdAt } = existingUser;
        dispatch(login({ id, username, email, createdAt }));
      }

      setIsLoading(false);
    };

    restoreAuth();
  }, [dispatch]);

  if (isLoading) return <p>LOADING....</p>;

  return isAuthenticated && user ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};
