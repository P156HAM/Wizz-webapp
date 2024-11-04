import { PaperAirplaneIcon } from "@primer/octicons-react";

interface CustomButton {
  content?: string;
  style: "default" | "icon";
  onClick?: () => void;
}

const CustomButton = ({ content, style, onClick }: CustomButton) => {
  return (
    <>
      {style === "default" ? (
        <button
          className="w-full p-2 bg-black text-white rounded hover:bg-white hover:text-black"
          onClick={onClick}
        >
          {content}
        </button>
      ) : (
        <button className="w-full p-2 bg-black text-white rounded-full flex items-center justify-center hover:bg-white/80 hover:text-black">
          <PaperAirplaneIcon size={24} />
        </button>
      )}
    </>
  );
};

export default CustomButton;
