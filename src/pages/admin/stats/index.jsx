import ReactApexChart from 'react-apexcharts';
import { getReportStatus } from '../../../utils/getReportStatus'
import LoadingWrapper from '../../../components/LoadingWrapper';
import { useState } from 'react';
import { useEffect } from 'react';
import API from '../../../utils/api-client';
import errorManager from '../../../utils/errorManager';

export default function AdminStats() {

    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState(null);
    
    useEffect(() => {
        const getStats = async () => {
            try {
                setIsLoading(true);
                const response = await API.get('statistics');
                setStats(response.data);
            } catch (error) {
                errorManager(error);
            } finally {
                setIsLoading(false);
            }
        }
        getStats();
    }, [])

    const pieChartOptions = {
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
        ],
    };

    const barChartOptions = {
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        }
    };

    const donutChartOptions = {
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
        <LoadingWrapper isLoading={isLoading}>
            <div className="flex items-start justify-center gap-x-10 relative flex-1 flex-col my-10">
                <div className='flex w-full gap-5 flex-col lg:flex-row items-start'>
                    <div className="w-full lg:w-1/2">
                        <h3 className='mb-5 text-center text-xl font-bold'>
                            Nombre de signalements par mois
                        </h3>
                        <ReactApexChart
                            className="w-full"
                            options={{
                                xaxis: {
                                    categories: (stats?.reports_per_month ?? [])?.map((e) => e.month),
                                },
                            }}
                            series={[{
                                name: 'Total',
                                data: (stats?.reports_per_month ?? [])?.map((e) => e.count),
                            }]}
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
                            options={{
                                ...donutChartOptions,
                                labels: (stats?.top_users ?? [])?.map((e) => e.full_name),
                            }}
                            series={(stats?.top_users ?? [])?.map((e) => e.report_count)}
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
                            options={{
                                ...pieChartOptions,
                                labels: (stats?.anomalie_counts ?? [])?.map((e) => e.anomalie),
                            }}
                            series={(stats?.anomalie_counts ?? [])?.map((e) => e.count)}
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
                            options={{
                                ...barChartOptions,
                                xaxis: {
                                    categories: (stats?.status_counts ?? [])?.map((e) => getReportStatus(e.status))
                                },
                            }}
                            series={[{
                                name: 'Total',
                                data: (stats?.status_counts ?? [])?.map((e) => e.count),
                            }]}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    )
}
