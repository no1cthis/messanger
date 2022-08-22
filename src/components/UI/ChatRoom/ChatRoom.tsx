import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import Photo from "../Photo/Photo";
import cl from "./chatRoom.module.scss";

interface ChatRoomProps {
  uid: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ uid }) => {
  const user = useTypedSelector((state) => state.user.users[uid]);
  const navigate = useNavigate();
  const avatar = user.avatar || "";
  const status = user.isOnline ? cl.status__online : cl.status__offline;
  return (
    <div
      className={cl.wrapper}
      onClick={() => navigate(`/${uid}`)}
      tabIndex={0}
    >
      <div className={cl.avatar}>
        <Photo width={50} height={50} img={avatar} />
        <div className={`${cl.status} ${status}`}></div>
      </div>
      <p className={cl.text}>{user.name}</p>
    </div>
  );
};

export default ChatRoom;
