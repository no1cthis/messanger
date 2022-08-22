import { forwardRef, useEffect, useRef, useState } from "react";
import cl from "./myMessage.module.scss";

interface MyMessageProps {
  text: string;
  readed: boolean;
  id: string;
}

const MyMessage = forwardRef<HTMLDivElement, MyMessageProps>(
  ({ text, readed }, ref) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callbackFunction = () => {
      setIsVisible(true);
    };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, options);
      if (containerRef.current) observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    }, [containerRef, options]);
    return (
      <div className={cl.wrapper} ref={ref}>
        <p className={cl.text} ref={containerRef}>
          {text}{" "}
          {readed && (
            <p className={cl.readed}>
              <i className="fa-solid fa-eye"></i>
            </p>
          )}
        </p>
      </div>
    );
  }
);

export default MyMessage;
