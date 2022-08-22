import React, { useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAuthService } from "../../services/authService";
import { IAuth, IInput } from "../../Types/types";
import Input from "../UI/Input/Input";
import Loader from "../UI/Loader/Loader";

import cl from "./login.module.scss";

const Login: React.FC = () => {
  const { loading, error } = useTypedSelector((state) => state.auth);
  const [dirty, setDirty] = useState(false);

  const passwordCheck = ".{8,32}";
  const emailCheck =
    "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$";

  const [values, setValues] = useState<IAuth>({
    email: "",
    password: "",
  });

  const inputs: IInput[] = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      errorText: "Not valid email. Check if it's correct",
      pattern: emailCheck,
      patternJS:
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorText: "Must be 8-32 character",
      pattern: passwordCheck,
      patternJS: /.{8,32}/,
    },
  ];

  const onLogin = () => {
    let valid = true;
    inputs.forEach((input) => {
      if (!input.patternJS.test(values[input.name])) valid = false;
    });
    if (!valid) {
      setDirty(true);
      return;
    }
    login(values.email, values.password);
    setDirty(true);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") onLogin();
  };

  const inputsElements = inputs.map((input) => {
    return (
      <Input
        key={input.name}
        values={values}
        setValues={setValues}
        dirtyFromParent={dirty}
        onKeyDown={onKeyDown}
        {...input}
      />
    );
  });

  const { register, login } = useAuthService();
  if (loading)
    return (
      <div className={cl.wrapper}>
        <Loader />
      </div>
    );

  return (
    <div className={cl.wrapper}>
      {inputsElements}
      <div className={cl.buttons}>
        <button
          className={cl.button}
          onClick={(e) => {
            e.preventDefault();
            register(inputs, values);
            setDirty(true);
          }}
        >
          {"Sign up"}
        </button>
        <button className={cl.button} type={"submit"} onClick={onLogin}>
          {"Login"}
        </button>
        <div className={cl.error}>{error}</div>
      </div>
    </div>
  );
};

export default Login;
