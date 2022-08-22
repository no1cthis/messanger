import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAuthService } from "../../services/authService";

import Chat from "../Chat/Chat";
import ChatList from "../UI/ChatList/ChatList";
import Loader from "../UI/Loader/Loader";

import cl from "./mainPage.module.scss";
import { useUserService } from "../../services/userService";

const MainPage: React.FC = () => {
  const { loading: authLoading } = useTypedSelector((state) => state.auth);
  const { loading: userLoading } = useTypedSelector((state) => state.user);
  const { getAllUsers } = useUserService();
  useEffect(() => {
    const unsubscribe: any = async () => {
      return await getAllUsers();
    };
    return unsubscribe;
  }, []);
  const { logout } = useAuthService();
  if (userLoading || authLoading)
    return (
      <div className={cl.loader_wrapper}>
        <Loader />;
      </div>
    );
  return (
    <div className={cl.wrapper}>
      <button className={cl.logout} onClick={logout}>
        {authLoading ? "Loading..." : "Logout"}
      </button>

      <ChatList />
      <Chat />
    </div>
  );
};

export default MainPage;
