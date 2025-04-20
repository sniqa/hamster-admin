import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";
import { UserInfo } from "./types/user";

interface UserContextType {
  token: string;
  user: UserInfo | null;
  setToken: (token: string) => void;
  setUser: Dispatch<React.SetStateAction<UserInfo | null>>;
  removeToken: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(
    window.localStorage.getItem("token") || ""
  );

  const [user, setUser] = useState<UserInfo | null>(null);

  const setToken = (token: string) => {
    setState(token);
    window.localStorage.setItem("token", token);
  };

  const removeToken = () => {
    setState("");
    window.localStorage.removeItem("token");
  };

  return (
    <UserContext value={{ token: state, setToken, removeToken, user, setUser }}>
      {children}
    </UserContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useUsers has to be used within <UserContext>");
  }

  return userContext;
};
