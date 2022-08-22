import { useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useAuthService } from "../../../services/authService";
import SearchInput from "../SearchInput/SearchInput";
import Photo from "../Photo/Photo";
import cl from "./chatList.module.scss";
import ChatRoom from "../ChatRoom/ChatRoom";
import Modal from "../Modal/Modal";

const ChatList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { loading: authLoading, uid: userUID } = useTypedSelector(
    (state) => state.auth
  );
  const { loading: userLoading, users } = useTypedSelector(
    (state) => state.user
  );
  const { updateAvatar } = useAuthService();

  const chatrooms = [];
  if (userLoading && authLoading) {
    return null;
  }
  for (let uid in users) {
    if (
      uid === userUID ||
      !users[uid].name.toLowerCase().includes(search.toLowerCase())
    )
      continue;
    chatrooms.push(<ChatRoom uid={uid} key={uid} />);
  }
  return (
    <div className={cl.wrapper}>
      <div className={cl.myProfile}>
        <label htmlFor="changeAvatar">
          <Photo
            changePhoto
            img={users[userUID]?.avatar}
            width={50}
            height={50}
          />
        </label>
        <div className={cl.searchBlock}>
          <p className={cl.myNickname} onClick={() => setOpenModal(true)}>
            My nickname: {users[userUID]?.name}
          </p>
          <input
            style={{ display: "none" }}
            id="changeAvatar"
            type={"file"}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                console.log(e.target.files[0]);
                updateAvatar(e.target.files[0], users[userUID]);
              }
            }}
          />

          <SearchInput
            placeholder="search"
            value={search}
            setValue={setSearch}
          />
        </div>
      </div>
      {chatrooms}
      {users[userUID]?.name === "" || openModal ? (
        <Modal setModal={setOpenModal} />
      ) : null}
    </div>
  );
};

export default ChatList;
