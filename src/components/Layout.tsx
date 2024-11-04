import { useLocation } from "react-router-dom";
import InputForm from "./InputForm";
import { UseMessagesReturn } from "../hooks/useMessages";
import { ReactNode, useEffect, useRef } from "react";
import { useUser } from "../context/userContext";

interface LayoutProps {
  messagesState: UseMessagesReturn;
  children?: ReactNode;
}
const Layout = ({ messagesState, children }: LayoutProps) => {
  const location = useLocation();
  const { username, userUID } = useUser();
  const isFooterVisible = location.pathname === "/chatroom";
  const { sendMessage, loadMoreMessages, hasMore, isLoadingMessages } =
    messagesState;

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const onSubmit = (message: string) => {
    sendMessage(message, username, userUID);
  };

  // Handle scroll for loading older messages
  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.scrollTop === 0 && hasMore && !isLoadingMessages) {
      await loadMoreMessages();
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 500);
    }
  }, []);

  return (
    <div className="flex min-h-[600px] max-h-[600px] fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white/80 shadow-lg sm:rounded-lg">
      <div className="flex flex-col items-center w-full">
        <header className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-300 w-full rounded-tl-lg rounded-tr-lg border-bottom-1 mb-4 p-4">
          <h1 className="text-2xl text-center font-bold"> WIZZZ </h1>
        </header>
        <div
          className="flex-1 w-full overflow-y-auto pb-20"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {children}
        </div>
        {isFooterVisible && (
          <footer className="w-full fixed bottom-0">
            <InputForm
              onSubmit={onSubmit}
              type="messageInput"
              placeholder="Type a message"
            />
          </footer>
        )}
      </div>
    </div>
  );
};

export default Layout;
