import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authSlice } from "../store/slices/authSlice";
import { chatSlice } from "../store/slices/chatSlice";
import { usersSlice } from "../store/slices/usersSlice";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...authSlice.actions, ...usersSlice.actions, ...chatSlice.actions }, dispatch);
};
