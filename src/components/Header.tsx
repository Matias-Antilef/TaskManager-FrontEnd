import { useState } from "react";
import { createPortal } from "react-dom";
import TaskModal from "./TaskModal";
import { useUserContext } from "../provider/UserProvider";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const { logout, user } = useUserContext();
  return (
    <>
      {showModal &&
        createPortal(
          <TaskModal
            option="create"
            title_modal={"Create new task"}
            onClose={() => setShowModal(false)}
            completed={false}
          />,
          document.body
        )}
      <div className=" w-full mt-5">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-center font-semibold">Task manager</h1>
          <h2 className="">For {user && user.username}</h2>
        </div>
        <div className="w-full justify-center flex py-5 gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white p-3 font-semibold rounded-lg"
          >
            Create new task
          </button>
          <button
            onClick={logout}
            className="bg-danger-200 text-danger border-[.5px] border-danger rounded-lg p-3 font-semibold hover:bg-danger hover:text-white transition-colors "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
export default Header;
