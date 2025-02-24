import React, { useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AssignMasterModal from '@renderer/components/AdminView/components/AssignMasterModal';

const RequestAssignMasterPage = () => {
    const [assignModalVisible, setAssignModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const masters = [
        { id: 1, name: 'Мастер 1' },
        { id: 2, name: 'Мастер 2' },
        { id: 3, name: 'Мастер 3' },
    ];

    const requests = [
        { id: 1, description: 'Заявка 1', status: 'Новая' },
        { id: 2, description: 'Заявка 2', status: 'В процессе' },
        { id: 3, description: 'Заявка 3', status: 'Завершена' },
    ];

    const handleAssignMaster = (master) => {
        console.log('Мастер назначен на заявку:', selectedRequest, master);
        // Здесь можно добавить логику назначения мастера на заявку
        setAssignModalVisible(false);
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button
                    label="Назначить мастера"
                    className="p-button-secondary p-button-sm"
                    onClick={() => {
                        setSelectedRequest(rowData);
                        setAssignModalVisible(true);
                    }}
                />
            </div>
        );
    };

    return (
        <div>
            <DataTable value={requests} paginator rows={10}>
                <Column field="id" header="ID" />
                <Column field="description" header="Описание" />
                <Column field="status" header="Статус" />
                <Column body={actionTemplate} header="Действия" />
            </DataTable>

            <AssignMasterModal
                visible={assignModalVisible}
                onHide={() => setAssignModalVisible(false)}
                onAssign={handleAssignMaster}
                masters={masters}
            />
        </div>
    );
}

export default RequestAssignMasterPage;