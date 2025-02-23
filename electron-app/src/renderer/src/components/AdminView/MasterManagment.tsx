import { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card } from "primereact/card";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const MasterManagment = () => {
    const [masters, setMasters] = useState([
        { id: 1, name: 'Иванов Иван', specialization: 'Принтеры', contact: '+7 (999) 123-45-67' },
        { id: 2, name: 'Петров Петр', specialization: 'Компьютеры', contact: '+7 (999) 765-43-21' },
    ]);
    const [selectedMaster, setSelectedMaster] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [masterName, setMasterName] = useState('');
    const [masterSpecialization, setMasterSpecialization] = useState('');
    const [masterContact, setMasterContact] = useState('');

    const specializations = [
        { label: 'Принтеры', value: 'Принтеры' },
        { label: 'Компьютеры', value: 'Компьютеры' },
        { label: 'Сканеры', value: 'Сканеры' },
    ];

    const saveMaster = () => {
        const newMaster = {
            id: masters.length + 1,
            name: masterName,
            specialization: masterSpecialization,
            contact: masterContact,
        };
        setMasters([...masters, newMaster]);
        setDisplayDialog(false);
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button
                    label="Редактировать"
                    className="p-button-secondary p-button-sm p-mr-2"
                    onClick={() => setSelectedMaster(rowData)}
                />
                <Button
                    label="Удалить"
                    className="p-button-danger p-button-sm"
                    onClick={() => setMasters(masters.filter((master) => master.id !== rowData.id))}
                />
            </div>
        );
    };

    return (
        <Card title="Управление мастерами" className="p-shadow-8" style={{ width: '90%', margin: '0 auto' }}>
            <Button
                label="Добавить мастера"
                className="p-mb-4"
                onClick={() => setDisplayDialog(true)}
            />
            <DataTable value={masters} paginator rows={10}>
                <Column field="name" header="ФИО" />
                <Column field="specialization" header="Специализация" />
                <Column field="contact" header="Контактные данные" />
                <Column body={actionTemplate} header="Действия" />
            </DataTable>

            <Dialog
                header="Добавить мастера"
                visible={displayDialog}
                style={{ width: '400px' }}
                onHide={() => setDisplayDialog(false)}
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="masterName">ФИО</label>
                        <InputText
                            id="masterName"
                            value={masterName}
                            onChange={(e) => setMasterName(e.target.value)}
                            placeholder="Введите ФИО"
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="masterSpecialization">Специализация</label>
                        <Dropdown
                            id="masterSpecialization"
                            value={masterSpecialization}
                            options={specializations}
                            onChange={(e) => setMasterSpecialization(e.value)}
                            placeholder="Выберите специализацию"
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="masterContact">Контактные данные</label>
                        <InputText
                            id="masterContact"
                            value={masterContact}
                            onChange={(e) => setMasterContact(e.target.value)}
                            placeholder="Введите контактные данные"
                        />
                    </div>

                    <Button
                        label="Сохранить"
                        className="p-mt-4"
                        onClick={saveMaster}
                    />
                </div>
            </Dialog>
        </Card>
    );
};

export default MasterManagment;