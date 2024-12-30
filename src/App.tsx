import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./register/RegisterPage";
import TaskPage from "./task/TaskPage";
import { PrivateRoutes, PublicRoutes } from "./models/routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
      <Route path={PublicRoutes.REGISTER} element={<RegisterPage />} />
      <Route path={PrivateRoutes.TASK_PAGE} element={<TaskPage />} />
    </Routes>
  );
}
export default App;