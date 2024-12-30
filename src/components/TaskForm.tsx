function TaskForm({
  filter,
  setFilter,
  statusFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
  statusFilter: (status: string) => void;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const selectedFilter = form.options.value;
    statusFilter(selectedFilter);
  }
  return (
    <div className="my-5">
      <input
        placeholder="Filter task"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 rounded-lg bg-default-400 border-[1px] border-default-200 focus:border-default outline-none my-5 placeholder:text-default-100 focus:placeholder:text-default-200"
      />

      <form
        className="gap-4 flex items-center justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="options"
            value=""
            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-gray-700">All</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="options"
            value="true"
            className="h-5 w-5 text-green-600 border-gray-300 focus:ring-green-500"
          />
          <span className="text-gray-700">Completed</span>
        </label>
        <label className="flex items-center  space-x-2  ">
          <input
            type="radio"
            name="options"
            value="false"
            className="h-5 w-5  text-yellow-600  border-gray-300 focus:ring-yellow-500"
          />
          <span className="text-gray-700">Pending</span>
        </label>
        <button
          type="submit"
          className="hover:cursor-pointer bg-primary-100 hover:bg-primary transition-colors border-[.5px] border-primary text-white p-3 rounded-lg "
        >
          Filter status
        </button>
      </form>
    </div>
  );
}
export default TaskForm;
