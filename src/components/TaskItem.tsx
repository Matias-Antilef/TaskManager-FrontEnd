import { TaskItemModel } from "../models/TaskModel";
import { useToggleTaskContext } from "../provider/TaskProvider";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useRemoveTask } from "../hooks/useMongoDB";
import { Trash2Icon } from "lucide-react";
import TaskModal from "./TaskModal";

function TaskItem({
  _id,
  title,
  completed,
  description,
  createdAt,
}: TaskItemModel) {
  const { removeTaskContext } = useToggleTaskContext();
  const [showModal, setShowModal] = useState(false);
  function handleRemove() {
    useRemoveTask(_id);
    removeTaskContext(_id);
  }

  const completedColor = "bg-success-300 border-success-100 text-success";
  const pendingColor = "bg-warning-300 border-warning-100 text-warning";
  return (
    <>
      {showModal &&
        createPortal(
          <TaskModal
            title_modal={"Edit Task"}
            onClose={() => setShowModal(false)}
            option="update"
            _id={_id}
            title={title}
            description={description}
            completed={completed}
          />,
          document.body
        )}
      <div
        className={`${
          completed ? completedColor : pendingColor
        }  w-full  max-w-full flex relative border-[1.5px] rounded-lg   min-h-32`}
      >
        <div className="flex flex-col items-center  min-w-[5vw] justify-center ">
          <button
            className="hover:bg-primary-100 transition-colors hover:text-white text-secondary  border-secondary font-semibold w-full h-12  rounded-lg "
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
          <Trash2Icon
            onClick={() => handleRemove()}
            className="bg-transparent hover:bg-danger  hover:text-white transition-colors text-danger  w-full hover:cursor-pointer p-2 h-12 font-semibold rounded-lg"
          />
        </div>
        <div className=" w-[calc(100%-5vw)] flex flex-col gap-2 p-2 relative bg-primary-300 rounded-lg">
          <div className="w-full justify-end flex gap-2">
            <span
              className={`${
                completed ? completedColor : pendingColor
              }  border-[.5px]  p-2 rounded-lg text-xs font-semibold`}
            >
              {new Date(createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span
              className={`${
                completed ? completedColor : pendingColor
              } border-[.5px] p-2 rounded-lg text-xs font-semibold`}
            >
              {completed ? "Completed" : "Pending"}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 break-words whitespace-pre-line">
            {title}
          </h2>
          <p className="text-sm text-gray-600 break-words whitespace-pre-line ">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
export default TaskItem;
