import { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import useRegisterUser from "../hooks/useRegisterUser";
import ErrorToast from "../components/ErrorToast";
import { useUser } from "../context/userContext";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { registerUser, registerError, setRegisterError } = useRegisterUser();
  const [showError, setShowError] = useState(false);
  const { username } = useUser();
  const navigate = useNavigate();

  const onCloseError = () => {
    setShowError(false);
    setRegisterError(null);
  };

  useEffect(() => {
    if (registerError) {
      setShowError(true);
    }
  }, [registerError]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-2xl font-bold pb-4"> Welcome to WIZZZ</h1>
      <h2 className="text-lg font-semibold pb-4 text-orange-500">
        Your daily chatapp
      </h2>
      <InputForm
        onSubmit={registerUser}
        type="nameInput"
        buttonLabel
        placeholder="Enter your display name"
        disabled={username ? true : false}
      />
      {username && (
        <div className="mt-4">
          <CustomButton
            content="Back to chatroom"
            style={"default"}
            onClick={() => navigate("/chatroom")}
          />
        </div>
      )}

      <ErrorToast
        message={registerError || ""}
        show={showError}
        onClose={onCloseError}
      />
    </div>
  );
};

export default Home;
