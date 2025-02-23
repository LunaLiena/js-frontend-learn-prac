import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const AddRequestForm = () => {
    const [equipmentType, setEquipmentType] = useState('');
    const [model, setModel] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [status, setStatus] = useState('новая заявка');

    const equipmentTypes = [
        { label: 'Принтер', value: 'printer' },
        { label: 'Сканер', value: 'scanner' },
        { label: 'Компьютер', value: 'computer' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
            id: Date.now(), // Генерация номера заявки
            date: new Date().toLocaleDateString(),
            equipmentType,
            model,
            problemDescription,
            clientName,
            clientPhone,
            status,
        };
        console.log('Новая заявка:', newRequest);
        // Здесь можно добавить логику для сохранения заявки в базу данных
    };

    return (
        <Card title="Добавить заявку" className="p-shadow-8" style={{ width: '500px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} className="p-fluid">
                <div className="p-field">
                    <label htmlFor="equipmentType">Вид оргтехники</label>
                    <Dropdown
                        id="equipmentType"
                        value={equipmentType}
                        options={equipmentTypes}
                        onChange={(e) => setEquipmentType(e.value)}
                        placeholder="Выберите вид оргтехники"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="model">Модель</label>
                    <InputText
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        placeholder="Введите модель"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="problemDescription">Описание проблемы</label>
                    <InputText
                        id="problemDescription"
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                        placeholder="Опишите проблему"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="clientName">ФИО клиента</label>
                    <InputText
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Введите ФИО клиента"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="clientPhone">Номер телефона</label>
                    <InputText
                        id="clientPhone"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Введите номер телефона"
                    />
                </div>
                <Button
                    label="Добавить заявку"
                    type="submit"
                    className="p-mt-4 p-button-raised p-button-primary"
                    style={{ width: '100%' }}
                />
            </form>
        </Card>
    )
}

export default AddRequestForm;