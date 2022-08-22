import { forwardRef, useEffect, useRef, useState } from "react";
import { useChatService } from "../../../services/chatService";
import cl from "./theirMessage.module.scss";

interface TheirMessageProps {
  text: string;
  readed: boolean;
  uidUser2: string;
  id: string;
}

const TheirMessage = forwardRef<HTMLDivElement, TheirMessageProps>(
  ({ text, id, readed, uidUser2 }, ref) => {
    const containerRef = useRef(null);
    const { readMessage } = useChatService();

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    useEffect(() => {
      const observer = new IntersectionObserver((entries, observer) => {
        if (!readed) readMessage(uidUser2, id);
      });
      if (containerRef.current) observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    }, [containerRef, options]);
    return (
      <div className={cl.wrapper} ref={ref}>
        <p ref={containerRef}>{text}</p>
        {readed && (
          <p className={cl.readed}>
            <i className="fa-solid fa-eye"></i>
          </p>
        )}
      </div>
    );
  }
);

export default TheirMessage;
