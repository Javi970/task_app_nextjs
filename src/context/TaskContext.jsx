"use client";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must used within a provider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  //esta funcion agrega las tareas
  const createTask = (title, description) =>
    setTasks([
      ...tasks,
      {
        title,
        description,
        id: uuid(),
      },
    ]);
  //esta funcion elimina tareas
  const deleteTask = (id) =>
    setTasks([...tasks.filter((task) => task.id !== id)]);

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
