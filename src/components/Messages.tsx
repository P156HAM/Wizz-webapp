import { ChatMessage } from "../constants/types";
import Message from "./Message";

interface MessagesProps {
  messages: ChatMessage[];
  currentUserUID: string;
}

const Messages = ({ messages, currentUserUID }: MessagesProps) => {
  const renderMessage = messages.map((message: ChatMessage) => (
    <Message
      key={message.id}
      content={message.content}
      date={message.timestamp.toLocaleString()}
      user={message.user}
      isCurrentUser={message.user.uid === currentUserUID}
    />
  ));
  return <div className="p-4">{renderMessage}</div>;
};

export default Messages;
