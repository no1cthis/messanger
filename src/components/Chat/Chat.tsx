import { useParams } from "react-router-dom";

import cl from "./chat.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Photo from "../UI/Photo/Photo";
import { useEffect, useRef, useState } from "react";
import { useChatService } from "../../services/chatService";
import MyMessage from "../UI/MyMessage/MyMessage";
import TheirMessage from "../UI/TheirMessage/TheirMessage";
import Loader from "../UI/Loader/Loader";
import MessageInput from "../UI/MessageInput/MessageInput";

const Chat: React.FC = () => {
  const lastMsg = useRef<HTMLDivElement>(null);
  const { fetchMessages } = useChatService();
  const [input, setInput] = useState("");
  const { uid: uidUser2 } = useParams();
  const user = useTypedSelector((state) => state.auth.uid);
  const chat = useTypedSelector((state) => state.chat);
  const { loading: userLoading, users } = useTypedSelector(
    (state) => state.user
  );
  const { loading: authLoading } = useTypedSelector((state) => state.auth);
  console.log(chat.messages);
  const scrollToBottom = () => lastMsg.current?.scrollIntoView();
  useEffect(() => {
    if (uidUser2) fetchMessages(uidUser2);
  }, [uidUser2, user]);
  useEffect(() => {
    scrollToBottom();
  }, [chat.loading]);

  if (!uidUser2) return null;

  if (userLoading || authLoading || chat.loading)
    return (
      <div className={cl.wrapper}>
        <Loader />
      </div>
    );

  const user2 = users[uidUser2];
  const messages = chat.messages.map((message, ind) => {
    if (message.from === user)
      return (
        <MyMessage
          text={message.text}
          key={message.id}
          ref={ind === chat.messages.length - 1 ? lastMsg : null}
          readed={message.readed}
          id={message.id}
        />
      );
    else
      return (
        <TheirMessage
          text={message.text}
          key={message.id}
          ref={ind === chat.messages.length - 1 ? lastMsg : null}
          readed={message.readed}
          uidUser2={uidUser2}
          id={message.id}
        />
      );
  });
  return (
    <div className={cl.wrapper}>
      <div className={cl.profile}>
        <Photo img={user2?.avatar} height={50} width={50} />
        <p className={cl.name}>{user2?.name}</p>
      </div>
      <div className={cl.messages__wrapper}>
        <div className={cl.messages}>{[...messages]}</div>
      </div>
      <MessageInput
        value={input}
        setValue={setInput}
        uidUser2={uidUser2}
        placeholder="Message"
        toBottom={scrollToBottom}
      />
    </div>
  );
};

export default Chat;
