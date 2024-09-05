import { InputLabel, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { INITIAL_CENTER, STATUS_COLORS, STATUS_LIST } from "../../constants";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Map, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { getReportStatus } from "../utils/getReportStatus";
import Report from "./Report";
import ModalImage from "react-modal-image";
import Spinner from "react-spinner-material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useState, useMemo, useEffect } from "react";
import { DateTime } from "luxon";
import errorManager from "../utils/errorManager";
import API from "../utils/api-client";

function AdminReportListContent({ setCurrentPage, activeReport, setActiveReport, reports, filteredReports, setFilteredReports, setOpen, setReports, pageProps, current_page, isLoading }) {

    const { setValue, register, formState: { errors }, handleSubmit, watch } = useForm({
        defaultValues: {
            status: activeReport?.status,
            clarification: activeReport?.clarification
        }
    })

    const selectReport = (id, type) => {
        const currentSelectedR = reports.find(report => report.id == id);
        setActiveReport(currentSelectedR);
        setValue('status', currentSelectedR?.status);
        setValue('clarification', currentSelectedR?.clarification);
        setViewState({
            longitude: currentSelectedR?.location.longitude,
            latitude: currentSelectedR?.location.latitude,
        })
        if (!!type) {
            if (!!activeReport.histories.length) {
                setOpen(true)
            } else {
                toast.error('L\'historique est vide')
            }
        }
    }

    const [viewState, setViewState] = useState({
        longitude: INITIAL_CENTER.longitude,
        latitude: INITIAL_CENTER.latitude,
        zoom: 13
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search, setSearch] = useState('');

    const submitClarification = async (data) => {
        try {
            setSearch(true);
            const response = await API.patch('admin/reports/'+activeReport?.id, data);
            const updatedR = {
                ...response?.data?.report,
                photos: JSON.parse(response?.data?.report?.photos)
            };
            setFilteredReports((prev) => prev.map((e) => (
                e.id == updatedR.id ? updatedR : e
            )))
            setReports((prev) => prev.map((e) => (
                e.id == updatedR.id ? updatedR : e
            )))
            setActiveReport(updatedR);
            toast.success('Signalement mis à jour avec succès');
        } catch (error) {
            errorManager(error);
        } finally {
            setSearch(false);
        }
    }

    const ReportMap = useMemo(() => {
        return (
            <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN+''}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                id="user-report-map"
                mapStyle='mapbox://styles/mapbox/dark-v11'
                style={{
                    width: "100%"
                }}
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
    }, [viewState, activeReport.location, filteredReports, search])

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
        <div className="flex items-start justify-center flex-col lg:flex-row gap-x-10 relative flex-1">
            <div className="flex flex-col items-start justify-start gap-6 my-10 w-full lg:w-1/2">
                <div>
                    <p className="max-lg:text-center">
                        Tous les signalements effectués par les utilisateurs sont affichés ici. Vous pouvez voir les détails de chaque signalement en cliquant dessus.
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
                                            <button key={status} onClick={() => searchReport(status, true)} className={`p-2 rounded ${(!!!filteredReports.length ? !!!status : !!!status ? (filteredReports.length === reports.length) : filteredReports.every((e) => e.status.includes(status))) ? 'bg-greener text-white' : 'bg-white text-greener border border-greener hover:bg-greener hover:text-white hover:border-transparent transition-all'}`}>
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
                    <div className="mt-5 flex flex-col gap-4 max-h-[50vh] lg:max-h-[94vh] overflow-y-scroll">
                        {
                            !!filteredReports.length
                            ?
                            filteredReports.map((report) => (
                                <div key={report.id} onMouseEnter={() => selectReport(report.id)} onClick={() => selectReport(report.id, 'click')}>
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
                        <button onClick={() => (((!!pageProps?.pagePointers?.prev_page_url) || !isLoading) && setCurrentPage((prev) => (prev - 1)))} disabled={isLoading || !!!pageProps?.pagePointers?.prev_page_url} className={`${!!!pageProps?.pagePointers?.prev_page_url && 'pointer-events-none opacity-20'} py-1 px-4 text-2xl bg-white text-greener border border-greener hover:bg-greener hover:text-white hover:border-transparent rounded transition-all`}>{"<"}</button>
                        <span>{current_page}/{pageProps.total}</span>
                        <button onClick={() => (((!!pageProps?.pagePointers?.next_page_url) || !isLoading) && setCurrentPage((prev) => (prev + 1)))} disabled={isLoading || !!!pageProps?.pagePointers?.next_page_url} className={`${!!!pageProps?.pagePointers?.next_page_url && 'pointer-events-none opacity-20'} py-1 px-4 text-2xl bg-white text-greener border border-greener hover:bg-greener hover:text-white hover:border-transparent rounded transition-all`}>{">"}</button>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(submitClarification)} className="w-full flex flex-col items-center lg:w-1/2 sticky overflow-x-hidden">
                <div className="min-h-[50vh] w-full">
                    {ReportMap}
                </div>
                <div className="min-h-[50vh] w-full p-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 w-full">
                            <div className="flex items-center justify-between gap-3 flex-wrap w-full">
                                <h2 className="text-2xl font-bold text-center">Signalement de <span className="pl-1 hover:underline font-normal">{activeReport.user.first_name+" "+activeReport.user.last_name}</span></h2>
                                <div className="gap-2 flex items-center">
                                    <Link className="flex hover:translate-y-2 transition-all" to={'tel:'+activeReport.user.phone}><AlternateEmailIcon fontSize="large" /></Link>
                                    <Link className="flex hover:translate-y-2 transition-all" to={'mailto:'+activeReport.user.email}><LocalPhoneIcon fontSize="large" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold">{activeReport.location.label} <span className="text-base font-normal">({activeReport.anomalie})</span></h3>
                            <p className="text-lg line-clamp-6">{activeReport.description}</p>
                            <p>Date: <span className="font-bold">{DateTime.fromISO(activeReport?.created_at).toFormat('dd/MM/yyyy HH:mm:ss')}</span></p>
                            <div className="flex items-center gap-2">
                                <InputLabel htmlFor="status" className="w-fit">Etat:</InputLabel>
                                <TextField
                                    select
                                    className="max-w-[200px]"
                                    id="status"
                                    value={watch('status')}
                                    inputProps={register('status', {
                                        required: 'Ce champ est requis'
                                    })}
                                >
                                    {
                                        STATUS_LIST.map((value, index) => (
                                            <MenuItem key={index} value={value} style={{ color: STATUS_COLORS[value] }}>{getReportStatus(value)}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </div>
                            <div>
                                <InputLabel htmlFor="clarification" className="mb-1">Clarification:</InputLabel>
                                <TextField
                                    id="clarification"
                                    placeholder="Veuillez clarifier l'état du signalement"
                                    multiline
                                    className="w-full !p-0 border border-gray-300 rounded"
                                    rows={4}
                                    {
                                        ...register('clarification')
                                    }
                                />
                                {
                                    errors.clarification && <p className="text-red-500 mt-1">{errors.clarification.message}</p>
                                }
                            </div>
                        </div>
                        <div>
                            {
                                !!activeReport?.photos?.length ? (
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
                                    <span className="text-red-500 font-bold">Aucun photo trouve</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start pl-4 mb-4">
                    <button className="w-full p-2 font-bold max-w-[140px] text-white bg-greener flex items-center justify-center rounded transition-all hover:bg-white border border-transparent hover:text-greener hover:border-black">
                        {(isSubmitting) ? <Spinner style={{height: "24px", width: "24px"}} color='white' /> : "Sauvegarder"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminReportListContent;