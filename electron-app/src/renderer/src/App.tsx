import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./components/login/LoginForm";
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";
import MasterPage from "./pages/MasterPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/master/*" element={<MasterPage />} />
        <Route path="/user/*" element={<UserPage />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
      <ToastContainer />
    </>

  );
}

export default App
