import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

interface Request {
    id: number;
    date: string;
    equipmentType: string;
    model: string;
    problemDescription: string;
    clientName: string;
    clientPhone: string;
    status: string;
}

const RequestList = () => {
    const [requests, setRequests] = useState<Request[]>([
        {
            id: 1,
            date: '2023-10-01',
            equipmentType: 'Принтер',
            model: 'HP LaserJet',
            problemDescription: 'Не печатает',
            clientName: 'Иванов Иван',
            clientPhone: '+7 (999) 123-45-67',
            status: 'Новая заявка',
        },
        {
            id: 2,
            date: '2023-10-02',
            equipmentType: 'Компьютер',
            model: 'Dell XPS',
            problemDescription: 'Не включается',
            clientName: 'Петров Петр',
            clientPhone: '+7 (999) 765-43-21',
            status: 'В процессе ремонта',
        },
    ]);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [status, setStatus] = useState('');

    const statusOptions = [
        { label: 'Новая заявка', value: 'Новая заявка' },
        { label: 'В процессе ремонта', value: 'В процессе ремонта' },
        { label: 'Завершена', value: 'Завершена' },
    ];

    const saveRequest = () => {
        if (selectedRequest) {
            const updatedRequests = requests.map((request) =>
                request.id === selectedRequest.id ? { ...request, status } : request
            );
            setRequests(updatedRequests);
        }
        setDisplayDialog(false);
        setStatus('');
        setSelectedRequest(null);
    };

    const editRequest = (request: Request) => {
        setSelectedRequest(request);
        setStatus(request.status);
        setDisplayDialog(true);
    };

    const deleteRequest = (request: Request) => {
        setRequests(requests.filter((r) => r.id !== request.id));
    };

    const actionTemplate = (rowData: Request) => {
        return (
            <div>
                <Button
                    label="Редактировать"
                    className="p-button-secondary p-button-sm p-mr-2"
                    onClick={() => editRequest(rowData)}
                />
                <Button
                    label="Удалить"
                    className="p-button-danger p-button-sm"
                    onClick={() => deleteRequest(rowData)}
                />
            </div>
        );
    };

    return (
        <Card title="Список заявок" className="p-shadow-8" style={{ width: '90%', margin: '0 auto' }}>
            <DataTable value={requests} paginator rows={10}>
                <Column field="id" header="Номер заявки" />
                <Column field="date" header="Дата добавления" />
                <Column field="equipmentType" header="Вид оргтехники" />
                <Column field="model" header="Модель" />
                <Column field="problemDescription" header="Описание проблемы" />
                <Column field="clientName" header="ФИО клиента" />
                <Column field="clientPhone" header="Номер телефона" />
                <Column field="status" header="Статус" />
                <Column body={actionTemplate} header="Действия" />
            </DataTable>

            <Dialog
                header="Редактировать заявку"
                visible={displayDialog}
                style={{ width: '400px' }}
                onHide={() => {
                    setDisplayDialog(false);
                    setStatus('');
                    setSelectedRequest(null);
                }}
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="status">Статус</label>
                        <Dropdown
                            id="status"
                            value={status}
                            options={statusOptions}
                            onChange={(e) => setStatus(e.value)}
                            placeholder="Выберите статус"
                        />
                    </div>

                    <Button
                        label="Сохранить изменения"
                        className="p-mt-4"
                        onClick={saveRequest}
                    />
                </div>
            </Dialog>
        </Card>
    );
};

export default RequestList;