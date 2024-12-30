import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useMongoDB";
import axios from "axios";
import { PublicRoutes } from "../models/routes";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data: any) {
    try {
      const response = await useRegister(data);
      if (response.status === 201) {
        navigate(`/${PublicRoutes.LOGIN}`);
        console.log(response);
      } else if (response.status === 400) {
        alert("User already exists");
      } else if (response.status === 500) {
        console.log("Internal server error");
      } else {
        console.log("Error...", response.status);
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
    reset();
  }

  return (
    <>
      <h1>Register</h1>

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
            placeholder="*****"
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
        you have account?
        <Link to={`/${PublicRoutes.LOGIN}`} className="text-primary">
          Login
        </Link>
      </div>
    </>
  );
}
export default RegisterPage;
