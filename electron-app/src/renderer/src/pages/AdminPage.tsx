import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminMenu from "@renderer/components/AdminView/AdminMenu";
import UserManagementPage from "@renderer/components/AdminView/pages/UserManagmentPage";
import RequestListPage from "@renderer/components/AdminView/pages/RequestPage";
import StatisticsPage from "@renderer/components/AdminView/pages/StatisticsPage";

export const AdminPage: React.FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <AdminMenu />
            <div style={{ flex: 1, padding: '20px' }}>
                <Routes>
                    <Route path="users" element={<UserManagementPage />} />
                    <Route path="requests" element={<RequestListPage />} />
                    <Route path="statistics" element={<StatisticsPage />} />
                    <Route path="*" element={<UserManagementPage />} /> {/* По умолчанию */}
                </Routes>
            </div>
        </div>
    )
}
export default AdminPage;
