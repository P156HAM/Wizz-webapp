import React, { useState } from "react";
import CustomButton from "./CustomButton";

interface InputFormProps {
  onSubmit: (value: string) => void;
  placeholder?: string;
  buttonLabel?: boolean;
  type: "nameInput" | "messageInput";
  disabled?: boolean;
}

const InputForm = ({
  onSubmit,
  placeholder,
  buttonLabel,
  type,
  disabled,
}: InputFormProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        id={type === "nameInput" ? "name" : "message"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled ? true : false}
        className={`w-full p-2 border rounded focus:ring-2 focus:ring-slate-400 ${
          type === "messageInput" ? "p-4" : "mb-4"
        }`}
      />
      <div
        className={
          type === "messageInput"
            ? "absolute right-2 top-1/2 -translate-y-1/2"
            : ""
        }
      >
        <CustomButton
          content={buttonLabel ? "Let's go!" : undefined}
          style={buttonLabel ? "default" : "icon"}
        />
      </div>
    </form>
  );
};

export default InputForm;
