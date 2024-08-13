import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { ANOMALIES, STATUS_LIST } from '../../../constants';
import { getReportStatus } from '../../utils/getReportStatus'

export default function AdminStats() {

    const pieChartOptions = {
        series: [30, 40, 35, 50, 49, 60, 70, 91, 125, 30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 200],
        labels: ANOMALIES.map((e) => e.title),
        responsive: [
            {
                breakpoint: 10000,
                options: {
                    chart: {
                        width: '100%',
                        height: '550'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    const lineChartOptions = {
        series: [
            {
                name: 'Total',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 220, 100],
            },
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
    };

    const barChartOptions = {
        series: [
            {
                name: 'Total',
                data: [5, 10, 15],
            },
        ],
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        xaxis: {
            categories: STATUS_LIST.map((e) => getReportStatus(e)),
        },
    };

    const donutChartOptions = {
        series: [30, 16, 5, 4, 3],
        labels: [
            'User 1',
            'User 2',
            'User 3',
            'User 4',
            'User 5',
        ],
        responsive: [
            {
                breakpoint: 10000,
                options: {
                    chart: {
                        width: '100%',
                        height: '450'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    return (
        <div className="flex items-start justify-center gap-x-10 relative flex-1 flex-col my-10">
            <div className="flex items-center gap-3 flex-col xl:flex-row justify-center xl:justify-between flex-wrap w-full">
                <h1 className="text-3xl font-bold text-center">Statistiques</h1>
                <div className='flex items-center gap-2 flex-wrap justify-center'>
                    <Link className="p-2 font-bold text-white bg-blue-500 rounded transition-all hover:bg-white border border-transparent hover:text-blue-500 hover:border-black" to='/admin/reports-list'>
                        List des signalements
                    </Link>
                </div>
            </div>
            <div className='flex w-full gap-5 flex-col lg:flex-row items-start mt-10 md:mt-20'>
                <div className="w-full lg:w-1/2">
                    <h3 className='mb-5 text-center text-xl font-bold'>
                        Nombre de signalements par mois
                    </h3>
                    <ReactApexChart
                        className="w-full"
                        options={lineChartOptions}
                        series={lineChartOptions.series}
                        type="line"
                        height={350}
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <h3 className='mb-5 text-center text-xl font-bold'>
                        Top 5 utilisateurs le plus actifs
                    </h3>
                    <ReactApexChart
                        className="w-full"
                        options={donutChartOptions}
                        series={donutChartOptions.series}
                        type="donut"
                        height={350}
                    />
                </div>
            </div>
            <div className='flex w-full gap-5 flex-col lg:flex-row items-start mt-10 lg:mt-20'>
                <div className="w-full lg:w-1/2">
                    <h3 className='mb-5 text-center text-xl font-bold'>
                        Division des signalements par type
                    </h3>
                    <ReactApexChart
                        className="w-full"
                        options={pieChartOptions}
                        series={pieChartOptions.series}
                        type="pie"
                        height={350}
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <h3 className='mb-5 text-center text-xl font-bold'>
                        Division des signalements par statue
                    </h3>
                    <ReactApexChart
                        className="w-full"
                        options={barChartOptions}
                        series={barChartOptions.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    )
}
