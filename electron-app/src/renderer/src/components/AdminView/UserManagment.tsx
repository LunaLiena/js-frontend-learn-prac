import { useState } from 'react';

import { User } from '../../models/User';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { ConfirmDialog } from 'primereact/confirmdialog';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';



const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
        { id: 2, username: 'operator', password: 'operator123', role: 'operator' },
        { id: 3, username: 'master', password: 'master123', role: 'master' },
        { id: 4, username: 'guest', password: 'guest123', role: 'guest' },
    ]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [visible, setVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const roles = [
        { label: 'Администратор', value: 'admin' },
        { label: 'Оператор', value: 'operator' },
        { label: 'Мастер', value: 'master' },
        { label: 'Гость', value: 'guest' },
    ];

    const saveUser = () => {
        if (selectedUser) {
            // Редактирование пользователя
            const updatedUsers = users.map((user: User) =>
                user.id === selectedUser.id ? { ...user, username, password, role } : user
            );
            setUsers(updatedUsers);
        } else {
            // Добавление нового пользователя
            const newUser = {
                id: users.length + 1, // Генерация нового id
                username,
                password,
                role,
            };
            setUsers([...users, newUser]);
        }
        setDisplayDialog(false);
        setUsername('');
        setPassword('');
        setRole('');
        setSelectedUser(null);
    };

    const editUser = (user) => {
        setSelectedUser(user);
        setUsername(user.username);
        setPassword(user.password);
        setRole(user.role);
        setDisplayDialog(true);
    };

    const deleteUser = (user) => {
        setUsers(users.filter((u) => u.id !== user.id));
    };

    const handleDeleteClick = (user: any) => {
        setUserToDelete(user);
        setVisible(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete);
        }
        setVisible(false);
    }

    const handleCancelDelete = () => {
        setVisible(false);
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                <Button
                    label="Редактировать"
                    className="p-button-secondary p-button-sm p-mr-2"
                    onClick={() => editUser(rowData)}
                />
                <Button
                    label="Удалить"
                    className="p-button-danger p-button-sm"
                    onClick={() => handleDeleteClick(rowData)}
                />
            </div>
        );
    };

    return (
        <Card title="Управление пользователями" className="p-shadow-8" style={{ width: '100%', margin: '0 auto', marginTop: '60px' }}>
            <Button
                label="Добавить пользователя"
                className="p-mb-4"
                style={{ marginBottom: '12px' }}
                onClick={() => setDisplayDialog(true)}
            />
            <DataTable value={users} paginator rows={10}>
                <Column field="username" header="Логин" />
                <Column field="role" header="Роль" />
                <Column body={actionTemplate} header="Действия" />
            </DataTable>

            <Dialog
                header={selectedUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
                visible={displayDialog}
                style={{ width: '400px' }}
                onHide={() => {
                    setDisplayDialog(false);
                    setUsername('');
                    setPassword('');
                    setRole('');
                    setSelectedUser(null);
                }}
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Логин</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите логин"
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="password">Пароль</label>
                        <InputText
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="role">Роль</label>
                        <Dropdown
                            id="role"
                            value={role}
                            options={roles}
                            onChange={(e) => setRole(e.value)}
                            placeholder="Выберите роль"
                        />
                    </div>

                    <Button
                        label={selectedUser ? 'Сохранить изменения' : 'Добавить пользователя'}
                        className="p-mt-4"
                        onClick={saveUser}
                    />
                </div>
            </Dialog>

            <ConfirmDialog
                visible={visible}
                onHide={handleCancelDelete}
                message="Вы уверены, что хотите удалить пользователя?"
                header="Подтверждение удаления"
                icon="pi pi-exclamation-triangle"
                accept={handleConfirmDelete}
                reject={handleCancelDelete}
                acceptLabel='Удалить'
                rejectLabel='Отмена'
            />
        </Card>
    );
};

export default UserManagement;