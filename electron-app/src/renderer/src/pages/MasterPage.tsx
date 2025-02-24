import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updateRequest } from '../services/api';
import { Request } from '../models/Request';
import { toast } from "react-toastify";
import RequestDetails from "./components/RequestDetails";
// Пример данных заявок (в реальном приложении данные будут приходить с сервера)
const initialRequests = [
    { id: 1, title: "Заявка 1", status: "Назначено" },
    { id: 2, title: "Заявка 2", status: "Назначено" },
    { id: 3, title: "Заявка 3", status: "Назначено" },
];



export const MasterPage: React.FC = () => {

    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [newComment, setNewComment] = useState("");
    const [newPart, setNewPart] = useState("");
    const [requests, setRequests] = useState<Request[]>([
        {
            id: 1,
            date: "2023-10-01",
            techType: "Принтер",
            model: "HP LaserJet",
            problemDescription: "Не печатает",
            clientName: "Иван Иванов",
            phoneNumber: "1234567890",
            status: "Новая",
            comments: [],
            parts: [],
        },
    ]);

    const navigate = useNavigate();

    const handleAddComment = () => {
        if (selectedRequest && newComment) {

            const updateRequest = requests.map((request) => {
                if (request.id === selectedRequest.id) {
                    return { ...request, comments: [...request.comments, newComment], };
                };
                return request;
            });

            setRequests(updateRequest);
            setNewComment("");
            toast.success("Комментарий добавлен!");
        } else {
            toast.error("Пожалуйста, введите комментарий.");
        }
    }

    const handleAddPart = () => {
        if (selectedRequest && newPart) {
            const updatedRequests = requests.map((request) =>
                request.id === selectedRequest.id
                    ? { ...request, parts: [...request.parts, newPart] }
                    : request
            );
            setRequests(updatedRequests);
            setNewPart("");
            toast.success("Запчасть добавлена!"); // Уведомление об успехе
        } else {
            toast.error("Пожалуйста, введите информацию о запчасти."); // Уведомление об ошибке
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    // Функция для изменения статуса заявки
    const changeRequestStatus = (id: number, newStatus: string) => {
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: newStatus } : request
            )
        );
    };

    // Функция для удаления выполненной заявки
    const completeRequest = (id: number) => {
        setRequests((prevRequests) =>
            prevRequests.filter((request) => request.id !== id)
        );
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", display: "flex", gap: "20px" }}>
            {/* Список заявок */}
            <div style={{ flex: 1 }}>
                <h2>Заявки</h2>
                {requests.map((request) => (
                    <div
                        key={request.id}
                        style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", cursor: "pointer" }}
                        onClick={() => setSelectedRequest(request)}
                    >
                        <h3>Заявка #{request.id}</h3>
                        <p>Статус: {request.status}</p>
                    </div>
                ))}
            </div>

            {/* Детали заявки */}
            {selectedRequest && (
                <RequestDetails
                    selectedRequest={selectedRequest}
                    onAddComment={handleAddComment}
                    onAddPart={handleAddPart}
                />
            )}
        </div>
    );
};

export default MasterPage;