import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useMongoDB";
import { PrivateRoutes, PublicRoutes } from "../models/routes";
import axios from "axios";
import { useUserContext } from "../provider/UserProvider";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useUserContext();

  const navigate = useNavigate();
  async function onSubmit(data: any) {
    try {
      const response = await useLogin(data);

      if (response.status === 200) {
        createUser(response.data.token, data.username);
        navigate(`/${PrivateRoutes.TASK_PAGE}`);
      } else if (response.status === 400) {
        alert("Unauthorized");
      } else if (response.status === 500) {
      } else {
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error in register user:",
          error.response?.status,
          error.response?.data
        );
      } else {
        console.error("Axios error:", error);
      }
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-2">
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] flex flex-col gap-4"
      >
        <div>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className="w-full p-3 my-3 rounded-lg outline-none border-2"
            placeholder="Enter a username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">
              {errors.username.message as string}
            </p>
          )}
          <input
            {...register("password", {
              required: "Password is required",
            })}
            className="w-full p-3 my-3 rounded-lg outline-none border-2"
            placeholder="enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className=" flex-1 bg-primary text-white p-2 font-semibold rounded-lg"
          >
            Confirm
          </button>
        </div>
      </form>
      <div className="flex gap-2">
        you dont have account?
        <Link to={`/${PublicRoutes.REGISTER}`} className="text-primary">
          Register
        </Link>
      </div>
    </div>
  );
}
export default LoginPage;
