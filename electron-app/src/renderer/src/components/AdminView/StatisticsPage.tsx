import { useState } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { User } from "@renderer/models/User";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const StatisticsPage = () => {
    const [selectedMaster, setSelectedMaster] = useState<User | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState('lastMonth');
    const periods = [
        { label: 'Последний месяц', value: 'lastMonth' },
        { label: 'Последний квартал', value: 'lastQuarter' },
        { label: 'Последний год', value: 'lastYear' },
    ];

    const masters = [
        { id: 1, name: 'Мастер 1' },
        { id: 2, name: 'Мастер 2' },
        { id: 3, name: 'Мастер 3' },
    ];

    // Пример данных для статистики
    const getStatisticsForMaster = (masterId) => {
        // Здесь можно загружать данные для конкретного мастера
        return {
            completedRequests: 120,
            averageCompletionTime: '2.5 дня',
            problemTypesData: {
                labels: ['Принтеры', 'Компьютеры', 'Сканеры', 'Другое'],
                datasets: [
                    {
                        label: 'Количество заявок',
                        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA'],
                        data: [65, 30, 20, 5], // Пример данных
                    },
                ],
            },
        };
    };

    const statistics = selectedMaster ? getStatisticsForMaster(selectedMaster.id) : null;

    const completedRequests = 120; // Количество выполненных заявок
    const averageCompletionTime = '2.5 дня'; // Среднее время выполнения
    const problemTypesData = {
        labels: ['Принтеры', 'Компьютеры', 'Сканеры', 'Другое'],
        datasets: [
            {
                label: 'Количество заявок',
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA'],
                data: [65, 30, 20, 5], // Пример данных
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{
            height: '100vh',
            width: '900px',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <Card
                title="Статистика"
                className="p-shadow-8"
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '20px',
                    boxSizing: 'border-box',
                    marginTop: '12px',
                }}
            >
                {/* Выбор периода */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '12px' }}>

                    <Dropdown
                        value={selectedMaster}
                        options={masters}
                        onChange={(e) => setSelectedMaster(e.value)}
                        optionLabel="name"
                        placeholder="Выберите мастера"
                        style={{ width: '200px', marginRight: '12px' }}
                    />

                    <Dropdown
                        value={selectedPeriod}
                        options={periods}
                        onChange={(e) => setSelectedPeriod(e.value)}
                        placeholder="Выберите период"
                        style={{ width: '200px' }}
                    />
                </div>

                {selectedMaster && statistics ? (
                    <div style={{
                        flex: 1,
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr', // Две колонки
                        gridTemplateRows: '1fr 2fr', // Две строки (график занимает больше места)
                        gap: '20px',
                        alignItems: 'stretch'
                    }}>
                        {/* Количество выполненных заявок */}
                        <Card title="Выполнено заявок" className="p-shadow-3" style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {completedRequests}
                            </h2>
                        </Card>

                        {/* Среднее время выполнения */}
                        <Card title="Среднее время выполнения" className="p-shadow-3" style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {averageCompletionTime}
                            </h2>
                        </Card>

                        {/* График типов неисправностей */}
                        <Card
                            title="Типы неисправностей"
                            className="p-shadow-3"
                            style={{
                                gridColumn: '1 / -1', // Занимает всю ширину
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <Chart
                                    type="pie"
                                    data={problemTypesData}
                                    options={chartOptions}
                                />
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p>Выберите мастера для отображения статистики</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default StatisticsPage;