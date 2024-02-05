import { ChangeEvent, FC, KeyboardEvent } from "react";
import styles from "./styles.module.css";

interface InputProps {
  value: string;
  focused?: boolean;
  onBlur?: () => void;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
}

const Input: FC<InputProps> = ({
  value,
  focused,
  onBlur,
  onChange,
  onKeyDown,
  placeholder,
}) => {
  return (
    <input
      type="text"
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      autoFocus={focused}
      onKeyDown={onKeyDown}
      className={styles.input}
      placeholder={placeholder}
    />
  );
};

export default Input;
