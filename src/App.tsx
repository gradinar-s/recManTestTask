import { FC, KeyboardEvent, useState } from "react";
import { Task } from "./features";
import { Input, Button } from "./components";
import { Status, TaskType } from "./features/Task/types";
import { getLsData, setLsData } from "./helpers";
import "./App.css";

const App: FC = () => {
  const lsTasks = getLsData("tasks") ?? [];
  const [tasks, setTasks] = useState<Array<TaskType>>(lsTasks);
  const [filterBy, setFilterBy] = useState<Status | null>(null);
  const [newTaskValue, setNewTaskValue] = useState("");

  const filteredTasks =
    filterBy !== null ? tasks?.filter((t) => t.status === filterBy) : tasks;

  const handleAddNewTask = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && newTaskValue) {
      const newTask = {
        id: Math.random(),
        text: newTaskValue,
        status: Status.PROGRESS,
      };

      setTasks((previous) => [newTask, ...previous]);
      setLsData("tasks", [newTask, ...tasks]);

      setNewTaskValue("");
    }
  };

  const handleRemoveTask = (id: number) => {
    const updatedTask = tasks?.filter((task) => task.id !== id);
    setTasks(updatedTask);
    setLsData("tasks", updatedTask);
  };

  const handleMarkTask = (id: number) => {
    const updatedTasks = tasks?.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status:
            task.status === Status.PROGRESS ? Status.DONE : Status.PROGRESS,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
    setLsData("tasks", updatedTasks);
  };

  const handleSaveTask = (id: number, value: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: value };
      }

      return task;
    });

    setTasks(updatedTasks);
    setLsData("tasks", updatedTasks);
  };

  return (
    <div className="box">
      <Input
        value={newTaskValue}
        onKeyDown={handleAddNewTask}
        placeholder="What are you going to do?"
        onChange={(e) => setNewTaskValue(e.target.value)}
      />

      <div className="tasks">
        {!tasks?.length && (
          <div>You haven't planned your day yet. Do it now {":)"}</div>
        )}

        {tasks?.length > 0 && (
          <div className="filters">
            <Button
              label="Completed"
              onClick={() => setFilterBy(Status.DONE)}
            />
            <Button
              label="In progress"
              onClick={() => setFilterBy(Status.PROGRESS)}
            />
          </div>
        )}

        {filteredTasks?.map((i) => (
          <Task
            id={i.id}
            key={i.id}
            value={i.text}
            status={i.status}
            onMark={handleMarkTask}
            onSave={handleSaveTask}
            onRemove={handleRemoveTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
