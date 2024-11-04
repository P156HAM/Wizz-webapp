import { XCircleIcon } from "@primer/octicons-react";

interface ErrorToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const ErrorToast = ({ message, show, onClose }: ErrorToastProps) => {
  return (
    <div
      className={`
        fixed bottom-5 left-1/2 transform -translate-x-1/2
        flex items-center gap-2 rounded-lg bg-red-500 p-4
        transition-all duration-200 ease-in-out
        ${show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
      `}
    >
      <h3 className="text-white text-sm font-semibold">{message}</h3>
      <button
        onClick={onClose}
        className="text-white hover:text-red-200 transition-colors"
        aria-label="Close error message"
      >
        <XCircleIcon size={20} />
      </button>
    </div>
  );
};

export default ErrorToast;
