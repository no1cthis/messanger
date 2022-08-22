import MainPage from "../MainPage/MainPage";

import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login";

import "./app.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { useAction } from "../../hooks/useAction";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthService } from "../../services/authService";

function App() {
  const { uid } = useTypedSelector((state) => state.auth);
  const users = useTypedSelector((state) => state.user.users);
  const { authFinish } = useAction();
  const { goOfline, goOnline } = useAuthService();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authFinish({ uid: user.uid, error: "" });
      } else authFinish({ uid: "", error: "" });
    });
  }, []);
  useEffect(() => {
    goOnline();
  }, [users[uid]?.uid]);
  window.onbeforeunload = (e) => {
    goOfline();
    return null;
  };

  return (
    <Routes>
      <Route path="/" element={uid ? <MainPage /> : <Login />} />
      <Route path="/:uid" element={uid ? <MainPage /> : <Login />} />
    </Routes>
  );
}

export default App;
