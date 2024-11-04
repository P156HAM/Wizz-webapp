import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import {
  ChatMessage,
  MESSAGE_LIMIT,
  MESSAGES_COLLECTION,
} from "../constants/types";
import { db } from "../config/firebaseConfig";
import { useEffect, useState } from "react";

export interface UseMessagesReturn {
  sendMessage: (
    messageText: string,
    username: string,
    userUID: string
  ) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  messages: ChatMessage[];
  hasMore: boolean;
  isLoadingMessages: boolean;
  messageError: string | null;
}

const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  const messageRef = collection(db, MESSAGES_COLLECTION);
  const mapMessageFromDoc = (doc: DocumentData): ChatMessage => ({
    id: doc.id,
    content: doc.data().content,
    user: doc.data().user,
    timestamp: doc.data().timestamp?.toDate(),
  });

  const sendMessage = async (
    messageText: string,
    username: string,
    userUID: string
  ) => {
    try {
      const message = {
        content: messageText,
        user: { username, uid: userUID },
        timestamp: Timestamp.fromDate(new Date()),
      };

      await addDoc(messageRef, message);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  useEffect(() => {
    setIsLoadingMessages(true);
    const firstQuery = query(
      messageRef,
      orderBy("timestamp", "desc"),
      limit(MESSAGE_LIMIT)
    );

    return onSnapshot(
      firstQuery,
      (snapshot) => {
        const messages = snapshot.docs.map(mapMessageFromDoc);
        setMessages(messages.reverse());
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === MESSAGE_LIMIT);
        setIsLoadingMessages(false);
      },
      (error) => {
        console.error("Error in snapshot listener:", error);
        setMessageError("Error loading messages: " + error.message);
        setIsLoadingMessages(false);
      }
    );
  }, []);

  const loadMoreMessages = async () => {
    if (!lastVisible || !hasMore || isLoadingMessages) return;

    setIsLoadingMessages(true);
    try {
      const nextQuery = query(
        messageRef,
        orderBy("timestamp", "desc"),
        startAfter(lastVisible),
        limit(MESSAGE_LIMIT)
      );

      const snapshot = await getDocs(nextQuery);
      if (!snapshot.empty) {
        const oldMessages = snapshot.docs.map(mapMessageFromDoc).reverse();
        setMessages((prev) => [...oldMessages, ...prev]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === MESSAGE_LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more messages:", error);
      setMessageError("Error loading more messages:");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  return {
    sendMessage,
    loadMoreMessages,
    messages,
    hasMore,
    isLoadingMessages,
    messageError,
  };
};

export default useMessages;
