import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContect = createContext();

export const useAuthContext = () => {
  return useContext(AuthContect);
};

export const AuthContectProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const CheckUserLoggedIn = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/auth/check`, { credentials: "include" });
        const data = await res.json();
        setAuthUser(data.user);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    CheckUserLoggedIn();
  }, []);

  return <AuthContect.Provider value={{ authUser, setAuthUser, loading }}>{children}</AuthContect.Provider>;
};
