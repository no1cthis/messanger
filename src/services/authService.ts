import { IAuth, IInput, IUser } from "../Types/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { auth, firestore, storage } from "../firebase";
import { setDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const useAuthService = () => {
  const { uid } = useTypedSelector((state) => state.auth);
  const { authStart, authFinish } = useAction();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      authStart();

      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(firestore, "users", result.user.uid), {
        isOnline: true,
      });
      authFinish({ error: "", uid: result.user.uid });
    } catch (error: any) {
      console.error(error.message);
      authFinish({ error: error.message, uid: "" });
    }
  };

  const logout = async () => {
    try {
      authStart();
      navigate("/");
      await signOut(auth);

      await updateDoc(doc(firestore, "users", uid), {
        isOnline: false,
      });
      authFinish({ error: "", uid: "" });
    } catch (error: any) {
      console.error(error.message);
      authFinish({ error: "", uid: "" });
    }
  };

  const register = async (inputs: IInput[], values: IAuth) => {
    let valid = true;
    inputs.forEach((input) => {
      if (!input.patternJS.test(values[input.name])) valid = false;
    });
    if (valid) {
      try {
        authStart();
        const result = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        console.log(result);

        await setDoc(doc(firestore, "users", result.user.uid), {
          uid: result.user.uid,
          name: "",
          email: values.email,
          isOnline: false,
        });
        await login(values.email, values.password);
        authFinish({ error: null, uid: result.user.uid });
      } catch (error: any) {
        console.error(error.message);
        authFinish({ error: error.message, uid: "" });
      }
    }
  };

  const updateAvatar = async (img: File, user: IUser) => {
    try {
      const imgRef = ref(
        storage,
        `avatar/${new Date().getTime()} - ${img.name}`
      );

      if (user.avatarPath) {
        await deleteObject(ref(storage, user.avatarPath));
      }

      const snap = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

      updateDoc(doc(firestore, "users", uid), {
        avatar: url,
        avatarPath: snap.ref.fullPath,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateName = async (value: string) => {
    try {
      updateDoc(doc(firestore, "users", uid), {
        name: value,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const goOnline = async () => {
    try {
      updateDoc(doc(firestore, "users", uid), {
        isOnline: true,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const goOfline = async () => {
    try {
      updateDoc(doc(firestore, "users", uid), {
        isOnline: false,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return {
    register,
    login,
    logout,
    updateAvatar,
    updateName,
    goOnline,
    goOfline,
  };
};
