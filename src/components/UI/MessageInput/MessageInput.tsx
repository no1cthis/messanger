import React, { Dispatch, SetStateAction } from "react";
import { useChatService } from "../../../services/chatService";

import cl from "./messageInput.module.scss";

interface MessageInputProps {
  placeholder?: string;
  value: string;
  toBottom: () => void | undefined;
  setValue: Dispatch<SetStateAction<string>>;
  uidUser2: string | null;
  height?: number | string;
  width?: number | string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  value,
  toBottom,
  setValue,
  height,
  width,
  uidUser2,
}) => {
  const { sendMessage } = useChatService();
  const keyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim()) {
      if (uidUser2) {
        sendMessage(uidUser2, value);
        setTimeout(() => {
          setValue("");
          toBottom();
        }, 10);
      }
    }
  };

  return (
    <form className={cl.wrapper} onSubmit={postMessage}>
      <textarea
        className={cl.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ height, width, padding: 15, resize: "none" }}
        onKeyDown={keyPress}
      />
      <button className={cl.button}>Send</button>
    </form>
  );
};

export default MessageInput;
