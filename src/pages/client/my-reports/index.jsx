import API from "../../../utils/api-client";
import { InputLabel, TextField } from "@mui/material";
import Map, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { useState, useEffect, useMemo } from "react";
import { INITIAL_CENTER, STATUS_COLORS, STATUS_LIST } from "../../../../constants";
import { getReportStatus } from "../../../utils/getReportStatus";
import Report from "../../../components/Report";
import ModalImage from "react-modal-image";
import Spinner from "react-spinner-material";
import LoadingWrapper from "../../../components/LoadingWrapper";
import errorManager from "../../../utils/errorManager";
import { DateTime } from "luxon";

export default function ClientReports() {

    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [activeReport, setActiveReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [current_page, setCurrentPage] = useState(1);
    const [pageProps, setPageProps] = useState({
        total: 0,
        pagePointers: {
            next_page_url: null,
            prev_page_url: null
        }
    });

    useEffect(() => {
        const getReportList = async () => {
            try {
                setIsLoading(true);
                const response = await API.get('client/reports/1?page='+(current_page));
                const data = response?.data?.data.map((e) => ({
                    ...e,
                    photos: JSON.parse(e.photos)
                }))
                const pageProps = {
                    total: Math.ceil(response?.data?.total / response?.data?.per_page),
                    pagePointers: {
                        next_page_url: response?.data?.next_page_url,
                        prev_page_url: response?.data?.prev_page_url
                    }
                }
                setPageProps(pageProps);
                setFilteredReports(data);
                setReports(data);
                setActiveReport(data[0]);
            } catch (error) {
                errorManager(error);
            } finally {
                setIsLoading(false);
            }
        }
        getReportList();
    }, [current_page]);

    const selectReport = (id) => {
        const activeR = reports.find(report => report.id == id);
        setActiveReport(activeR);
        setViewState({
            longitude: activeR?.location?.longitude,
            latitude: activeR?.location?.latitude,
        })
    }

    const [viewState, setViewState] = useState({
        longitude: INITIAL_CENTER.longitude,
        latitude: INITIAL_CENTER.latitude,
        zoom: 13
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');

    const ReportMap = useMemo(() => {
        return (
            <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN+''}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                id="user-report-map"
                mapStyle='mapbox://styles/mapbox/dark-v11'
            >
                {
                    filteredReports.map((report) => (
                        <Marker onClick={() => selectReport(report.id)} key={report.id} {...report.location} className="cursor-pointer" anchor="bottom" />
                    ))
                }
                <NavigationControl />
                <FullscreenControl />
            </Map>
        )
    }, [viewState, activeReport?.location, filteredReports, search])

    function resizeHandler () {
        const el = document.getElementById('user-report-map');
        if (!el) return;
        if (window.innerWidth <= 1024) {
            el.style.height = '500px';
            el.style.width = '100%';
        } else {
            el.style.height = '50vh';
            el.style.width = '100%';
        }
    }
    useEffect(() => {
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [])

    const searchReport = (value, preventUpdateState) => {
        try {
            setIsSubmitting(true);
            if (!preventUpdateState) {
                setSearch(value);
                setFilteredReports(reports.filter(report => report.location.label.toLowerCase().includes(value.toLowerCase())))
            } else {
                setFilteredReports(reports.filter(report => report.status.toLowerCase().includes(value.toLowerCase())))
            }
        } catch (error) {
            errorManager(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <LoadingWrapper isLoading={isLoading}>
            <div className="flex items-start justify-center flex-col lg:flex-row gap-x-10 relative flex-1">
                <div className="flex flex-col items-start justify-start gap-6 my-10 w-full lg:w-1/2">
                    <div>
                        <p className="max-lg:text-center">
                            Tous les signalements que vous avez effectués sont affichés ci-dessous. Vous pouvez consulter les détails de chaque signalement en cliquant sur l'un des signalements.
                        </p>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col gap-4 w-full">
                            <div>
                                <div className="flex items-center justify-between gap-2 flex-wrap pb-4">
                                    <InputLabel htmlFor="search" className="text-lg font-semibold">Rechercher un signalement</InputLabel>
                                    <div className="flex items-center justify-center gap-4">
                                        {
                                            ['', ...STATUS_LIST].map((status) => (
                                                <button key={status} onClick={() => searchReport(status, true)} className={`p-2 rounded ${(!!!filteredReports?.length ? !!!status : !!!status ? (filteredReports.length === reports.length) : filteredReports.every((e) => e.status.includes(status))) ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white hover:border-transparent transition-all'}`}>
                                                    {(!!!status) ?  'Tous' : getReportStatus(status)}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center w-full relative">
                                    <TextField
                                        type="text"
                                        id="first_name"
                                        className="w-full border border-gray-300 rounded"
                                        placeholder="Rechercher un signalement"
                                        value={search}
                                        onChange={(e) => searchReport(e.target.value)}
                                    />
                                    <div>
                                        <Spinner style={{height: "24px", width: "24px"}} visible={isSubmitting} className="absolute top-2 right-2" color='black' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col gap-4 max-h-[50vh] lg:max-h-[80vh] overflow-y-scroll">
                            {
                                !!filteredReports.length
                                ?
                                filteredReports.map((report) => (
                                    <div key={report.id} onMouseEnter={() => selectReport(report.id)} onClick={() => selectReport(report.id)}>
                                        <Report {...report} />
                                    </div>
                                ))
                                :
                                <span className="w-full text-2xl text-red-500 font-bold text-center">
                                    Aucun signalement trouvé
                                </span>
                            }
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-end py-2">
                        <div className="flex items-center gap-2 w-fit">
                            <button onClick={() => (((!!pageProps?.pagePointers?.prev_page_url) || !isLoading) && setCurrentPage((prev) => (prev - 1)))} disabled={isLoading || !!!pageProps?.pagePointers?.prev_page_url} className={`${!!!pageProps?.pagePointers?.prev_page_url && 'pointer-events-none opacity-20'} py-1 px-4 text-2xl bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white hover:border-transparent rounded transition-all`}>{"<"}</button>
                            <span>{current_page}/{pageProps.total}</span>
                            <button onClick={() => (((!!pageProps?.pagePointers?.next_page_url) || !isLoading) && setCurrentPage((prev) => (prev + 1)))} disabled={isLoading || !!!pageProps?.pagePointers?.next_page_url} className={`${!!!pageProps?.pagePointers?.next_page_url && 'pointer-events-none opacity-20'} py-1 px-4 text-2xl bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white hover:border-transparent rounded transition-all`}>{">"}</button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center lg:w-1/2 sticky">
                    <div className="min-h-[50vh] w-full">
                        {ReportMap}
                    </div>
                    <div className="min-h-[50vh] w-full p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 w-full">
                                <h2 className="text-2xl font-bold text-center">Ma signalement</h2>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold">{activeReport?.location.label} <span className="text-base font-normal">({activeReport?.anomalie})</span></h3>
                                <p className="text-lg line-clamp-6">{activeReport?.description}</p>
                                <p className="font-bold">Date: <span className="font-normal">{DateTime.fromISO(activeReport?.created_at).toFormat('dd/MM/yyyy HH:mm:ss')}</span></p>
                                <p className="font-bold">Etat: <span className="font-bold" style={{color: STATUS_COLORS[activeReport?.status]}}>{getReportStatus(activeReport?.status)}</span></p>
                                <p><span className="font-bold">Clarification: </span>{(!!activeReport?.clarification) ? activeReport?.clarification : 'Pas de clarification pour le moment!'}</p>
                            </div>
                            <div>
                                {
                                    activeReport?.photos.length > 0 ? (
                                        <div className="flex items-center gap-2 overflow-x-scroll">
                                            {
                                                activeReport?.photos?.map((photo, index) => (
                                                    <div onClick={() => handleShowImage(index)} key={index} className="min-w-36 w-36 h-36 rounded overflow-hidden [&>div]:h-full [&>div]:w-full [&:hover_img]:scale-110 flex items-center justify-center">
                                                        <ModalImage
                                                            className="cursor-pointer h-full w-full object-fill transition-all"
                                                            small={photo}
                                                            large={photo}
                                                            alt={"Report"+index}
                                                        />
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        )
                                    :
                                    <div className="flex gap-2 items-start flex-col">
                                        <div className="w-36 h-36 overflow-hidden">
                                            <img src="/images/warning.png" alt="Report" className="object-cover" />
                                        </div>
                                        <span className="text-red-500">Aucun photo trouve</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    )
}
