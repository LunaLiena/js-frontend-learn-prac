import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./components/login/LoginForm";
import { AdminPage } from "./pages/AdminPage";
import { GuestPage } from "./pages/GuestPage";

const App: React.FC = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/guest" element={<GuestPage />} />
      <Route path="/" element={<Navigate to={"/login"} />} />
    </Routes>

  );
}

export default App
