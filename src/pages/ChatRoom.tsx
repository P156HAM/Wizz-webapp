import Messages from "../components/Messages";
import { useUser } from "../context/userContext";
import { UseMessagesReturn } from "../hooks/useMessages";

interface ChatRoomProps {
  messagesState: UseMessagesReturn;
}

const ChatRoom = ({ messagesState }: ChatRoomProps) => {
  const { messages } = messagesState;
  const { userUID } = useUser();

  return <Messages messages={messages} currentUserUID={userUID} />;
};

export default ChatRoom;
