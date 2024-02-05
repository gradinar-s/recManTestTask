import { FC, ChangeEvent, KeyboardEvent, useState } from "react";
import { Status } from "./types";
import { Input } from "../../components";
import { Bin, Cancel, Check, VerticalDots } from "../../icons";
import styles from "./styles.module.css";

interface TaskProps {
  id: number;
  value: string;
  status: Status;
  onMark: (id: number) => void;
  onRemove: (id: number) => void;
  onSave: (id: number, text: string) => void;
}

const Task: FC<TaskProps> = ({
  id,
  value,
  status,
  onSave,
  onMark,
  onRemove,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [taskValue, setTaskValue] = useState(value);

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value);
  };

  const handleSaveTask = () => {
    handleEditTask();
    onSave(id, taskValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSaveTask();
    }
  };

  const handleEditTask = () => {
    setEditMode((previous) => !previous);
  };

  return (
    <div className={styles.root}>
      <div className={styles.task}>
        {isEditMode ? (
          <Input
            focused
            value={taskValue}
            onBlur={handleSaveTask}
            onKeyDown={handleKeyDown}
            onChange={handleChangeTask}
          />
        ) : (
          <div
            className={[styles.text, styles[status]].join(" ")}
            onClick={handleEditTask}
          >
            {value}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.action} onClick={() => onMark(id)}>
          {status === Status.PROGRESS ? <Check /> : <Cancel />}
        </div>
        <div className={styles.action} onClick={() => onRemove(id)}>
          <Bin />
        </div>
        <div className={styles.action}>
          <VerticalDots />
        </div>
      </div>
    </div>
  );
};

export default Task;
