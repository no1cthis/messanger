import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { useAction } from "../hooks/useAction";
import { IMessage } from "../Types/types";

export const useChatService = () => {
  const user = useTypedSelector((state) => state.auth.uid);
  const messages = useTypedSelector((state) => state.chat.messages);
  const { chatFetchStart, chatFetchSuccess, chatFetchFail } = useAction();

  const sendMessage = async (uidUser2: string, text: string) => {
    try {
      const chatID =
        user > uidUser2 ? `${user + uidUser2}` : `${uidUser2 + user}`;

      await addDoc(collection(firestore, "messages", chatID, "chat"), {
        text,
        from: user,
        to: uidUser2,
        sendedAt: Timestamp.fromDate(new Date()),
        readed: false,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const readMessage = async (uidUser2: string, msgID: string) => {
    try {
      const chatID =
        user > uidUser2 ? `${user + uidUser2}` : `${uidUser2 + user}`;

      await updateDoc(doc(firestore, "messages", chatID, "chat", msgID), {
        readed: true,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const fetchMessages = (uidUser2: string) => {
    try {
      chatFetchStart();
      const chatID =
        user > uidUser2 ? `${user + uidUser2}` : `${uidUser2 + user}`;

      const messagesRef = collection(firestore, "messages", chatID, "chat");

      const q = query(messagesRef, orderBy("sendedAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        const messages: IMessage[] = [];
        querySnapshot.forEach((doc) => {
          const message = doc.data();
          message.id = doc.id;
          //@ts-ignore
          messages.push(message);
        });
        chatFetchSuccess(messages);
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return { sendMessage, fetchMessages, readMessage };
};
