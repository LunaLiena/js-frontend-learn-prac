import React, { useState } from "react";
import { toast } from 'react-toastify';
interface RequestDetailsProps {
    selectedRequest: {
        id: number;
        status: string;
        problemDescription: string;
        comments: string[];
        parts: string[];
    };
    onAddComment: (comment: string) => void;
    onAddPart: (part: string) => void;
}

const RequestDetails: React.FC<RequestDetailsProps> = ({
    selectedRequest,
    onAddComment,
    onAddPart,
}) => {
    const [newComment, setNewComment] = useState("");
    const [newPart, setNewPart] = useState("");

    const handleAdd = () => {
        if (!newPart.trim()) {
            toast.error("Запчасть обязательна для добавления!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        onAddPart(newPart);
        setNewPart("");

        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment("");
        }

        toast.success("Данные успешно добавлены!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#FF8000", borderRadius: "8px", paddingLeft: "30px", paddingRight: '30px' }}>
            <h2>Заявка #{selectedRequest.id}</h2>
            <p>Статус: {selectedRequest.status}</p>
            <p>Описание: {selectedRequest.problemDescription}</p>

            {/* Комментарии */}
            <h3>Комментарии</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {selectedRequest.comments.map((comment, index) => (
                    <li key={index} style={{ padding: "8px", backgroundColor: "#fff", marginBottom: "8px", borderRadius: "4px" }}>
                        {comment}
                    </li>
                ))}
            </ul>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Добавить комментарий"
                    style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
            </div>

            <h3>Запчасти</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {selectedRequest.parts.map((part, index) => (
                    <li key={index} style={{ padding: "8px", backgroundColor: '#fff', marginBottom: '8px', borderRadius: '4px' }}>
                        {part}
                    </li>
                ))}
            </ul>
            {/* Запчасти */}

            <div style={{ display: "flex", gap: "8px", marginBottom: '16px' }}>
                <input
                    type="text"
                    value={newPart}
                    onChange={(e) => setNewPart(e.target.value)}
                    placeholder="Добавить запчасть (обязательно)"
                    style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button
                    onClick={handleAdd}
                    disabled={!newPart.trim()}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        width: '100%',
                        opacity:
                            newPart.trim() ? 1 : 0.5,
                    }}
                >
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default RequestDetails;