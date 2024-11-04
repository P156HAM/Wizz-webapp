import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

interface RegisterUserReturn {
  registerUser: (username: string) => void;
  loading: boolean;
  registerError: string | null;
  setRegisterError: (error: string | null) => void;
}

const useRegisterUser = (): RegisterUserReturn => {
  const navigate = useNavigate();
  const { setUsername, setUserUID } = useUser();
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const registerUser = async (username: string) => {
    try {
      setLoading(true);
      setRegisterError(null);

      //validate
      if (!username || username.trim().length < 3) {
        throw new Error("Username must be at least 3 characters long");
      }

      const uid = uuidv4();
      const trimmedUsername = username.trim();

      // store in localStorage
      localStorage.setItem("username", trimmedUsername);
      localStorage.setItem("userUID", uid);

      //update context
      setUsername(username);
      setUserUID(uid);
    } catch (error) {
      setRegisterError(
        error instanceof Error ? error.message : "Failed to register user"
      );
    } finally {
      setLoading(false);
      navigate("/chatroom");
    }
  };

  //Cleanup
  useEffect(() => {
    return () => {
      setLoading(false);
      setRegisterError(null);
    };
  }, []);

  return { registerUser, loading, registerError, setRegisterError };
};

export default useRegisterUser;
