import { Dispatch, SetStateAction, useState } from "react";
import { IAuth } from "../../../Types/types";

import cl from "./input.module.scss";

interface InputProps {
  placeholder: string;
  helperText?: string;
  errorText: string;
  values: IAuth | string;
  name: "password" | "email";
  patternJS: RegExp;
  dirtyFromParent?: boolean;
  setValues?: Dispatch<SetStateAction<IAuth>>;
  setValue?: Dispatch<SetStateAction<string>>;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  helperText,
  errorText,
  values,
  name,
  setValues,
  setValue,
  patternJS,
  dirtyFromParent,
  onKeyDown,
  ...inputProps
}) => {
  const [dirty, setDirty] = useState(false);

  const err =
    !patternJS.test(typeof values === "string" ? values : values[name]) &&
    (dirtyFromParent || dirty);

  let helperTextElement = err ? (
    <div className={`${cl["input__helper-text"]} ${cl.error}`}>{errorText}</div>
  ) : (
    <div className={cl["input__helper-text"]}>{helperText}</div>
  );

  return (
    <div className={cl.wrapper}>
      <input
        onKeyDown={onKeyDown}
        type="text"
        className={cl.input}
        placeholder={placeholder}
        style={{ borderColor: err ? "#CB3D40" : undefined }}
        value={typeof values === "string" ? values : values[name]}
        onChange={(e) =>
          typeof values === "string"
            ? setValue && setValue(e.target.value)
            : setValues && setValues({ ...values, [name]: e.target.value })
        }
        onBlur={() => setDirty(true)}
        {...inputProps}
      />
      <div
        className={`${cl.input__filled} ${err ? cl.error : null}`}
        style={{
          opacity: typeof values === "string" ? values : values[name] ? 1 : 0,
        }}
      >
        {placeholder}
      </div>
      {helperTextElement}
    </div>
  );
};

export default Input;
