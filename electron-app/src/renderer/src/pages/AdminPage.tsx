import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminMenu from "@renderer/components/AdminView/AdminMenu";
import UserManagementPage from "@renderer/components/AdminView/pages/UserManagmentPage";
import RequestListPage from "@renderer/components/AdminView/pages/RequestPage";
import StatisticsPage from "@renderer/components/AdminView/pages/StatisticsPage";
import RequestAssignMasterPage from "@renderer/components/AdminView/pages/RequestAssignMasterPage";
import { useState } from "react";


export const AdminPage: React.FC = () => {
    const [assignModalVisible, setAssignModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const navigate = useNavigate();

    const masters = [
        { id: 1, name: 'Мастер 1' },
        { id: 2, name: 'Мастер 2' },
        { id: 3, name: 'Мастер 3' },
    ];


    const handleAssignMaster = (master) => {
        console.log('Мастер назначен:', master);
        // Здесь можно добавить логику назначения мастера на заявку
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <div style={{ display: 'flex' }}>
            <AdminMenu />
            <div style={{ flex: 1, padding: '20px' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "920px",
                        padding: "10px 20px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}>
                    Выйти
                </button>
                <Routes>
                    <Route path="users" element={<UserManagementPage />} />
                    <Route path="requests" element={<RequestListPage />} />
                    <Route path="statistics" element={<StatisticsPage />} />
                    <Route path="assign-master" element={<RequestAssignMasterPage />} />
                    <Route path="*" element={<UserManagementPage />} /> {/* По умолчанию */}
                </Routes>
            </div>
        </div>
    )
}
export default AdminPage;
