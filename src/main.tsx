import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TaskProvider from "./provider/TaskProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./provider/UserProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </TaskProvider>
    </BrowserRouter>
  </StrictMode>
);
