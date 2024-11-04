import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  username: string;
  setUsername: (username: string) => void;
  userUID: string;
  setUserUID: (userUID: string) => void;
  loadingUser: boolean;
}

const UserDataContext = createContext<UserContextProps | undefined>(undefined);

const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [userUID, setUserUID] = useState<string>("");
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const loadUserDetailsFromLocalStorage = () => {
      const username = localStorage.getItem("username");
      const userUID = localStorage.getItem("userUID");

      if (username && userUID) {
        setUsername(username);
        setUserUID(userUID);
      }

      setLoadingUser(false);
    };

    loadUserDetailsFromLocalStorage();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        username,
        setUsername,
        loadingUser,
        userUID,
        setUserUID,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserDataContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserDataProvider");
  }

  return context;
};

export { UserDataProvider, useUser };
