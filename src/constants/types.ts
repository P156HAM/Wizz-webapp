export type User = {
  username: string;
  uid: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  user: User;
  timestamp: Date | string;
};

export const MESSAGES_COLLECTION = "wizzz_messages";
export const MESSAGE_LIMIT = 25;
