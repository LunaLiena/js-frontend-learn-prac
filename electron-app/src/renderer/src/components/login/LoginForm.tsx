import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css'; // Тема
import 'primereact/resources/primereact.min.css'; // Основные стили
import 'primeicons/primeicons.css'; // Иконки
import 'primeflex/primeflex.css'; // Утилиты для flex-верстки
import './style/loginform.css';

import { Password } from 'primereact/password';
import { Card } from 'primereact/card';

import users from '@renderer/test-users/users';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            switch (user.role) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'user':
                    navigate('/user');
                    break;
                case 'master':
                    navigate('/master');
                    break;
                default:
                    navigate('/user');
                    break;
            }
        } else {
            setError('Неверный логин или пароль');
        }

    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh', marginTop: '10em', marginBottom: '10em' }}>
            <Card title="Вход в систему" className="p-shadow-8" style={{ width: '400px' }}>
                <form onSubmit={handleSubmit}>
                    {/* Поле для логина */}
                    <div className="p-field">
                        <label htmlFor="username" className="p-d-block p-mb-2">Логин</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-mt-2 custom-input"
                            placeholder="Введите имя пользователя"
                        />
                    </div>

                    {/* Поле для пароля */}
                    <div className="p-field" style={{ marginTop: '12px' }}>
                        <label htmlFor="password" className="p-d-block p-mb-2">Пароль</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-mt-2 p-w-full custom-password"
                            placeholder="Введите пароль"
                            feedback={false} // Отключаем подсказки о сложности пароля
                            toggleMask
                            inputClassName='p-password-input'
                            inputStyle={{ width: '100%', paddingRight: '11.6rem' }}
                            panelStyle={{ width: '100%' }}
                            style={{ width: '100%', paddingBottom: '12px' }}
                        />
                    </div>

                    {/* Кнопка входа */}
                    <Button
                        label="Войти"
                        type="submit"
                        className="p-mt-4 p-button-raised p-button-primary p-w-full"
                        style={{ width: '100%' }}
                    />

                    {/* Отображение ошибки */}
                    {error && (
                        <div className="p-mt-4 p-text-center p-text-danger">
                            {error}
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;