import { useForm } from "react-hook-form";
import { useToggleTaskContext } from "../provider/TaskProvider";
import { useCreateTask, useUpdateTask } from "../hooks/useMongoDB";
import { TaskModalProps } from "../models/ModalTask";

function TaskModal({
  onClose,
  title_modal,
  _id,
  title,
  description,
  completed,
  option,
}: TaskModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addTaskContext, updateTaskContext } = useToggleTaskContext();

  async function onSubmit(data: any) {
    if (option === "update") {
      const response = await useUpdateTask({
        ...data,
        _id: _id,
      });

      updateTaskContext(response);
    }

    if (option === "create") {
      const response = await useCreateTask({
        ...data,
        completed: false,
      });
      addTaskContext(response);
      window.location.reload();
    }

    onClose();
    reset();
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-xl font-semibold"> {title_modal} </h1>
        <div>
          <input
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            className="w-full p-3 my-3 rounded-lg outline-none border-2"
            placeholder="Enter a title"
            defaultValue={title}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message as string}
            </p>
          )}
          <input
            {...register("description", {
              maxLength: {
                value: 100,
                message: "Description cannot exceed 100 characters",
              },
            })}
            className="w-full p-3 my-3 rounded-lg outline-none border-2"
            placeholder="Enter a description"
            defaultValue={description}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message as string}
            </p>
          )}
          {option === "update" && (
            <select
              {...register("completed")}
              className="w-full p-3 my-3 rounded-lg outline-none border-2"
              defaultValue={completed ? "true" : "false"}
            >
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className=" flex-1 bg-primary text-white p-2 font-semibold rounded-lg"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-danger hover:text-white transition-colors  flex-[.5] text-danger p-2 font-semibold rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskModal;
