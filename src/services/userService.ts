import { firestore } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useAction } from "../hooks/useAction";
import { IUser } from "../Types/types";

export const useUserService = () => {
  const { userFetchStart, userFetchFail, userFetchSuccess } = useAction();

  const getAllUsers = async () => {
    try {
      userFetchStart();
      const usersRef = collection(firestore, "users");

      const q = query(usersRef);

      const unsub = onSnapshot(q, (querySnapshot) => {
        const users: { [key: string]: IUser } = {};
        //@ts-ignore
        querySnapshot.forEach((doc) => {
          //@ts-ignores-
          const user: IUser = doc.data();
          users[user.uid] = user;
        });
        userFetchSuccess(users);
      });

      return unsub;
    } catch (err: any) {
      console.error(err.message);
      userFetchFail(err.message);
    }
  };
  return { getAllUsers };
};
