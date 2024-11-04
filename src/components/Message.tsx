import { useState } from "react";
import { User } from "../constants/types";

interface MessageProps {
  content: string;
  isCurrentUser: boolean;
  date: string;
  user: User;
}

const Message = ({ content, isCurrentUser, date, user }: MessageProps) => {
  const [showDate, setShowDate] = useState<boolean>(false);

  const onClick = () => {
    setShowDate(!showDate);
  };

  const styles = {
    bg: isCurrentUser ? "bg-orange-500" : "bg-slate-400",
    borderRadius: isCurrentUser
      ? "rounded-full rounded-br-none"
      : "rounded-full rounded-bl-none",
    position: isCurrentUser ? "self-end" : "self-start",
  };

  return (
    <div className="flex flex-col my-2" onClick={onClick}>
      <div className={`${styles.position}`}>
        <h1>{user.username}</h1>
        <div
          className={`w-fit ${styles.bg} ${styles.borderRadius} p-2 cursor-pointer`}
        >
          <h1 className="text-white text-base font-normal">{content}</h1>
        </div>
      </div>
      {showDate && <p className={`text-xs ${styles.position}`}>{date}</p>}
    </div>
  );
};

export default Message;
