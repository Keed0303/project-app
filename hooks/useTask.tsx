import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  from: string;
  to: string;
  description: string;
}

// Create Context task
interface TaskContextType {
  tasks: Task[];
  selectedTask: Task | undefined;
  setSelectedTask: (task: Task | undefined) => void;
  addTask: (task: Task) => Promise<void>;
}

// create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  // Load saved tasks on app start
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error loading tasks", error);
      }
    };
    loadTasks();
  }, []);

  // Add a new task
  const addTask = async (task: Task) => {
    try {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, selectedTask, setSelectedTask, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
};