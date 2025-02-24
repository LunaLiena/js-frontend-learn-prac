import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Request } from '../models/Request';
import { toast } from "react-toastify";
export const UserPage: React.FC = () => {
    // Состояния для полей формы
    const [techType, setTechType] = useState("");
    const [model, setModel] = useState("");
    const [problemDescription, setProblemDescription] = useState("");
    const [clientName, setClientName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    // Состояния для ошибок валидации
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [requests, setRequests] = useState<Request[]>([]);
    // Валидация формы
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!techType) newErrors.techType = "Укажите вид оргтехники";
        if (!model) newErrors.model = "Укажите модель";
        if (!problemDescription) newErrors.problemDescription = "Опишите проблему";
        if (!clientName) newErrors.clientName = "Укажите ФИО клиента";
        if (!phoneNumber) newErrors.phoneNumber = "Укажите номер телефона";
        else if (!/^\d{10,15}$/.test(phoneNumber)) {
            newErrors.phoneNumber = "Номер телефона должен содержать от 10 до 15 цифр";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Возвращает true, если ошибок нет
    };

    // Обработка отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Создаем объект заявки
            const newRequest = {
                id: Date.now(), // Номер заявки (временный, пока нет бэкенда)
                date: new Date().toLocaleString(), // Дата добавления
                techType,
                model,
                problemDescription,
                clientName,
                phoneNumber,
                status: "Новая",
                comments: [],
                parts: [],
            };

            setRequests([...requests, newRequest]);
            toast.success("Заявка успешно отправлена!");
            // Сохраняем заявку (временное решение, пока нет бэкенда)

            // Очищаем форму
            setTechType("");
            setModel("");
            setProblemDescription("");
            setClientName("");
            setPhoneNumber("");
        } else {
            toast.error("Пожалуйста, заполните все поля корректно.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", backgroundColor: '#d9d9d9', borderRadius: '12px' }}>
            <h1 style={{ color: 'black', textAlign: 'center' }}>Оставить заявку</h1>
            <form onSubmit={handleSubmit}>
                {/* Вид оргтехники */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: 'black' }}>Вид оргтехники:</label>
                    <input
                        type="text"
                        value={techType}
                        onChange={(e) => setTechType(e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                    {errors.techType && (
                        <span style={{ color: "red", fontSize: "14px" }}>{errors.techType}</span>
                    )}
                </div>

                {/* Модель */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: 'black' }}>Модель:</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                    {errors.model && (
                        <span style={{ color: "red", fontSize: "14px" }}>{errors.model}</span>
                    )}
                </div>

                {/* Описание проблемы */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: 'black' }}>Описание проблемы:</label>
                    <textarea
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                        style={{ width: "100%", padding: "8px", height: "100px" }}
                    />
                    {errors.problemDescription && (
                        <span style={{ color: "red", fontSize: "14px" }}>
                            {errors.problemDescription}
                        </span>
                    )}
                </div>

                {/* ФИО клиента */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: 'black' }}>ФИО клиента:</label>
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                    {errors.clientName && (
                        <span style={{ color: "red", fontSize: "14px" }}>{errors.clientName}</span>
                    )}
                </div>

                {/* Номер телефона */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ color: 'black' }}>Номер телефона:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                    {errors.phoneNumber && (
                        <span style={{ color: "red", fontSize: "14px" }}>{errors.phoneNumber}</span>
                    )}
                </div>

                {/* Кнопка отправки */}
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: '100%'
                    }}
                >
                    Отправить заявку
                </button>
            </form>
        </div>
    );
};

export default UserPage;