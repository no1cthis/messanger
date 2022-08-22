import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootReducer } from "../store/store";

export const useTypedSelector:TypedUseSelectorHook<RootReducer> = useSelector