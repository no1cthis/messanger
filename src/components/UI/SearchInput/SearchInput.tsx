import { Dispatch, SetStateAction } from "react";

import cl from "./searchInput.module.scss";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  height?: number | string;
  width?: number | string;
  textarea?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  setValue,
  height,
  width,
}) => {
  return (
    <div className={cl.wrapper}>
      <input
        className={cl.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ height, width }}
      />
    </div>
  );
};

export default SearchInput;
