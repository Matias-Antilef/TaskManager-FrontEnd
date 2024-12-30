import { useEffect, useState } from "react";
import { usetaskContext, useToggleTaskContext } from "../provider/TaskProvider";
import { useGetTasks } from "../hooks/useMongoDB";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskWrapper from "../components/TaskWrapper";
import TaskItem from "../components/TaskItem";

function TaskPage() {
  const tasks = usetaskContext();
  const { getTaskContext } = useToggleTaskContext();
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromApi = await useGetTasks(statusFilter);
      getTaskContext(tasksFromApi);
      console.log(tasksFromApi);
      console.log(tasks);
    };

    fetchTasks();
  }, [statusFilter]);

  const filteredTasks = () => {
    return tasks.filter((task) => task.title.includes(filter));
  };

  return (
    <div className="min-h-screen w-full bg-slate-400 items-center flex flex-col">
      <div className="xl:max-w-[60vw] max-sm:max-w-[100vw] w-full">
        <Header />

        <TaskForm
          filter={filter}
          setFilter={setFilter}
          statusFilter={setStatusFilter}
        />

        <TaskWrapper>
          {filteredTasks().map((task) => (
            <TaskItem key={task._id} {...task} />
          ))}
        </TaskWrapper>
      </div>
    </div>
  );
}
export default TaskPage;
