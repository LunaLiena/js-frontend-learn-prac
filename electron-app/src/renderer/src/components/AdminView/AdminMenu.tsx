import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const AdminMenu = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Заявки',
            icon: 'pi pi-fw pi-list',
            items: [
                {
                    label: 'Список заявок',
                    icon: 'pi pi-fw pi-list',
                    command: () => navigate('/admin/requests'),
                },
                {
                    label: 'Добавить заявку',
                    icon: 'pi pi-fw pi-plus',
                    command: () => navigate('/admin/add-request'),
                },
            ],
        },
        {
            label: 'Пользователи',
            icon: 'pi pi-fw pi-users',
            command: () => navigate('/admin/users'),
        },
        {
            label: 'Статистика',
            icon: 'pi pi-fw pi-chart-bar',
            command: () => navigate('/admin/statistics'),
        },
        {
            label: 'Назначить мастера',
            command: () => navigate('/admin/assign-master'),

        },
    ];

    const menubarStyle: React.CSSProperties = {
        width: '100%',
        borderRadius: '0',
        padding: '0 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        position: 'fixed',
        top: 0,
        zIndex: 1000
    };

    return <Menubar model={items} style={menubarStyle} />;
};

export default AdminMenu;