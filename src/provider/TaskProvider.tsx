import React, { ReactNode, useState, useContext } from "react";
import { TaskItemModel, taskToggleContextModel } from "../models/TaskModel";

export const taskContext = React.createContext<TaskItemModel[]>([]);
export const taskToggleContext = React.createContext<taskToggleContextModel>({
  addTaskContext: () => {},
  removeTaskContext: () => {},
  updateTaskContext: () => {},
  getTaskContext: () => {},
});

export function usetaskContext() {
  return useContext(taskContext);
}

export function useToggleTaskContext() {
  return useContext(taskToggleContext);
}

function TaskProvider({ children }: { children: ReactNode }) {
  const [task, setTask] = useState<TaskItemModel[]>([]);

  function addTaskContext(task: TaskItemModel) {
    setTask((prevTasks) => [task, ...prevTasks]);
  }

  function getTaskContext(task: TaskItemModel[]) {
    setTask([...task]);
  }

  function removeTaskContext(_id: string) {
    setTask((prevTasks) => prevTasks.filter((task) => task._id !== _id));
  }

  function updateTaskContext({
    title,
    _id,
    description,
    completed,
  }: TaskItemModel) {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task._id === _id ? { ...task, title, description, completed } : task
      )
    );
  }

  return (
    <taskContext.Provider value={task}>
      <taskToggleContext.Provider
        value={{
          getTaskContext,
          addTaskContext,
          removeTaskContext,
          updateTaskContext,
        }}
      >
        {children}
      </taskToggleContext.Provider>
    </taskContext.Provider>
  );
}
export default TaskProvider;
