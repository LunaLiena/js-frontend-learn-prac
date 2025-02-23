import { useState } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const StatisticsPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('lastMonth');
    const periods = [
        { label: 'Последний месяц', value: 'lastMonth' },
        { label: 'Последний квартал', value: 'lastQuarter' },
        { label: 'Последний год', value: 'lastYear' },
    ];

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
        <div className="p-d-flex p-flex-column p-ai-center p-mt-4">
            <Card title="Статистика" className="p-shadow-8" style={{ width: '90%' }}>
                <div className="p-d-flex p-jc-end p-mb-4">
                    <Dropdown
                        value={selectedPeriod}
                        options={periods}
                        onChange={(e) => setSelectedPeriod(e.value)}
                        placeholder="Выберите период"
                    />
                </div>

                <div className="p-grid">
                    {/* Количество выполненных заявок */}
                    <div className="p-col-12 p-md-4">
                        <Card title="Выполнено заявок" className="p-shadow-3">
                            <h2>{completedRequests}</h2>
                        </Card>
                    </div>

                    {/* Среднее время выполнения */}
                    <div className="p-col-12 p-md-4">
                        <Card title="Среднее время выполнения" className="p-shadow-3">
                            <h2>{averageCompletionTime}</h2>
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-4">
                        <Card title="Типы неисправностей" className="p-shadow-3">
                            <div style={{ height: '300px' }}>
                                <Chart
                                    type="pie"
                                    data={problemTypesData}
                                    options={chartOptions}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    );
}
export default StatisticsPage;