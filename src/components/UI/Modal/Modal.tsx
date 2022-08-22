import React, { useState } from "react";
import { useAuthService } from "../../../services/authService";
import Input from "../Input/Input";
import cl from "./modal.module.scss";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ setModal }) => {
  const [value, setValue] = useState("");
  const [dirty, setDirty] = useState(false);
  const { updateName } = useAuthService();
  console.log(value);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.patternJS.test(value)) {
      setDirty(true);
      return;
    }
    updateName(value);
    setModal(false);
  };
  const nameCheck = "^[a-zA-Z]*.{2,12}$";
  const input = {
    type: "text",
    placeholder: "Your nickname",
    errorText: "Start letter and must have 3-12 characters",
    required: true,
    pattern: nameCheck,
    patternJS: /^[a-zA-Z].{2,12}$/,
  };
  return (
    <div className={cl.modal}>
      <div className={cl.modal__content}>
        <p>Write your nickname</p>
        <form onSubmit={onSubmit}>
          <Input
            values={value}
            setValue={setValue}
            name="email"
            {...input}
            dirtyFromParent={dirty}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
