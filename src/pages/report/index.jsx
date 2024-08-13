import { InputLabel, MenuItem, TextField } from "@mui/material";
import Map, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { getGeocode } from 'use-places-autocomplete';
import { useState } from "react";
import { useMemo } from "react";
import { FilePond } from "react-filepond";
import errorManager from "../../utils/errorManager";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AutocompleteInput from "../../components/AutoCompleteInput";
import { useLoadScript } from "@react-google-maps/api";
import { LIBRARIES, INITIAL_CENTER, ANOMALIES } from "../../../constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";

export default function ReportIssue() {

    const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            location: {
                longitude: INITIAL_CENTER.longitude,
                latitude: INITIAL_CENTER.latitude,
                label: ''
            },
            description: '',
            anomalie: 10,
            photos: [],
            user: {
                first_name: '',
                last_name: '',
                email: '',
                phone: ''
            }
        }
    })

    const [viewState, setViewState] = useState({
        longitude: INITIAL_CENTER.longitude,
        latitude: INITIAL_CENTER.latitude,
        zoom: 14
    });

    const [locationLoading, setLocationLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleMapClick = async (evt) => {
        const result = await getGeocode({ location: {
            lat: evt.lngLat.lat,
            lng: evt.lngLat.lng
        }});
        setValue('location', {
            longitude: evt.lngLat.lng,
            latitude: evt.lngLat.lat,
            label: result[0].formatted_address
        })
    }

    const ReportMap = useMemo(() => {
        return (
            <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN+''}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                onClick={evt => handleMapClick(evt)}
                id="user-report-map"
                mapStyle='mapbox://styles/mapbox/dark-v11'
            >
                <Marker {...watch('location')} anchor="bottom" />
                <NavigationControl />
                <FullscreenControl />
            </Map>
        )
    }, [viewState, watch('location')])

    const locateUser = () => {
        try {
            if (navigator.geolocation) {
                setLocationLoading(true);
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const result = await getGeocode({ location: {
                        lat: latitude,
                        lng: longitude
                    }});
                    setValue('location', {
                        longitude,
                        latitude,
                        label: result[0].formatted_address
                    })
                    setViewState({
                        longitude,
                        latitude,
                    })
                }, (error) => {
                    errorManager(error);
                });
            } else {
                throw new Error("Geolocation n'est pas supporté par votre navigateur");
            }
        } catch (error) {
            errorManager(error);
        } finally {
            setLocationLoading(false);
        }
    }

    function resizeHandler () {
        if (window.innerWidth <= 1024) {
            document.getElementById('user-report-map').style.position = 'static';
            document.getElementById('user-report-map').style.height = '500px';
            document.getElementById('user-report-map').style.width = '100%';
        } else {
            document.getElementById('user-report-map').style.position = 'fixed';
            document.getElementById('user-report-map').style.height = '100vh';
            document.getElementById('user-report-map').style.width = '49%';
        }
    }
    useEffect(() => {
        locateUser();
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY+'',
        libraries: LIBRARIES,
    })

    const setAddress = (addr) => {
        setValue('location', addr);
        setViewState({
            longitude: addr.longitude,
            latitude: addr.latitude,
            zoom: 15
        })
    }

    const submitData = (data) => {
        try {
            setIsSubmitting(true);
            console.log(data);
            toast.success('Votre signalement a été envoyé avec succès');
        } catch (error) {
            errorManager(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex items-start justify-center flex-col-reverse lg:flex-row gap-x-10 relative flex-1">
            <div className="flex flex-col items-start justify-start gap-6 my-10 w-full lg:w-1/2">
                <div className="flex items-center gap-3 flex-col xl:flex-row justify-center xl:justify-between flex-wrap w-full">
                    <h1 className="text-3xl font-bold text-center">Signalement une Anomalies</h1>
                    <Link className="p-2 font-bold text-white bg-blue-500 rounded transition-all hover:bg-white border border-transparent hover:text-blue-500 hover:border-black" to='/my-reports'>
                        Mes signalements
                    </Link>
                </div>
                <div>
                    <p className="max-lg:text-center">Formulaires pour la description des anomalies avec
                    possibilité d'ajouter des photos et la localisation GPS.</p>
                </div>
                <div className="w-full">
                    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(submitData)}>
                        <div>
                            <InputLabel required htmlFor="location" className="text-lg font-semibold">Localisation (GPS)</InputLabel>
                            <div className="flex items-center w-full">
                                {
                                    !!isLoaded
                                    &&
                                    <AutocompleteInput
                                        _address={watch('location')}
                                        setAddress={setAddress}
                                        setValue={setValue}
                                    />
                                }
                                <button type="button" className="p-2 font-bold h-[45px] text-white bg-blue-500 transition-all hover:bg-white flex items-center justify-center border border-transparent hover:text-blue-500 hover:border-black rounded" onClick={locateUser}>
                                    {(locationLoading) ? <Spinner style={{height: "24px", width: "24px"}} color='white' /> : "Localiser"}
                                </button>
                            </div>
                            {
                                errors?.location && <p className="text-red-500 text-sm">{errors?.location.message}</p>
                            }
                        </div>
                        <div className="w-full">
                            <InputLabel required htmlFor="description" className="text-lg font-semibold">Description de l'anomalie</InputLabel>
                            <div className="p-2">
                                <TextField
                                    id="description"
                                    placeholder="Description de l'anomalie"
                                    multiline
                                    className="w-full !p-0 border border-gray-300 rounded"
                                    rows={4}
                                    {
                                        ...register('description', {
                                            required: 'Ce champ est requis',
                                            minLength: {
                                                value: 10,
                                                message: 'Description trop courte'
                                            }
                                        })
                                    }
                                />
                            </div>
                            {
                                errors?.description && <p className="text-red-500 text-sm">{errors?.description.message}</p>
                            }
                        </div>
                        <div className="w-full">
                            <InputLabel required htmlFor="anomalie" className="text-lg font-semibold">Type d'anomalie</InputLabel>
                            <div className="p-2">
                                <TextField
                                    select
                                    className="w-full"
                                    id="anomalie"
                                    inputProps={register('anomalie', {
                                        required: 'Ce champ est requis'
                                    })}
                                    defaultValue={10}
                                >
                                    {
                                        ANOMALIES.map(({ title, value }, index) => (
                                            <MenuItem key={index} value={value}>{title}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </div>
                            {
                                errors?.anomalie && <p className="text-red-500 text-sm">{errors?.anomalie.message}</p>
                            }
                        </div>
                        <div className="w-full">
                            <InputLabel htmlFor="photos" className="text-lg font-semibold">Photos</InputLabel>
                            <div className="p-2">
                                <FilePond
                                    id="photos"
                                    acceptedFileTypes={['image/*']}
                                    allowMultiple={true}
                                    files={watch('photos')}
                                    onupdatefiles={(fileItems) => {
                                        setValue('photos', fileItems.map(fileItem => fileItem.file));
                                    }}
                                    maxFiles={10}
                                    credits={false}
                                    allowImageCrop={true}
                                    allowImageResize
                                    labelIdle="Déposez vos fichiers ou <span class='filepond--label-action' className='font-bold font-main'>Parcourir</span>"
                                    {
                                        ...register('photos', {
                                            validate: {
                                                size: (files) => {
                                                    return files.length <= 10 || 'Maximum de 10 photos';
                                                },
                                                format: (files) => {
                                                    return files.every(file => file.type.match(/^image\//)) || 'Format de fichier invalide';
                                                }
                                            }
                                        })
                                    }
                                />
                            </div>
                            {
                                errors?.photos && <p className="text-red-500 text-sm">{errors?.photos.message}</p>
                            }
                        </div>
                        <div className="w-full">
                            <h3 className="text-lg font-semibold">Coordonnées du citoyen</h3>
                            <div className="p-2 flex flex-col gap-2.5">
                                <div className="w-full flex">
                                    <div className="w-1/2">
                                        <InputLabel required htmlFor="first_name" className="text-base font-semibold">Nom</InputLabel>
                                        <div className="relative flex items-center">
                                            <TextField
                                                type="text"
                                                id="first_name"
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Nom de citoyen"
                                                {
                                                    ...register('user.first_name', {
                                                        required: 'Ce champ est requis',
                                                        pattern: {
                                                            value: /^[a-zA-Z\s]{3,}$/,
                                                            message: 'Nom invalide'
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                        {
                                            errors?.user?.first_name && <p className="text-red-500 text-sm">{errors?.user?.first_name.message}</p>
                                        }
                                    </div>
                                    <div className="w-1/2">
                                        <InputLabel required htmlFor="last_name" className="text-base font-semibold">Prenom</InputLabel>
                                        <div className="relative flex items-center">
                                            <TextField
                                                type="text"
                                                id="last_name"
                                                className="w-full p-2 border border-gray-300 rounded"
                                                placeholder="Prenom de citoyen"
                                                {
                                                    ...register('user.last_name', {
                                                        required: 'Ce champ est requis',
                                                        pattern: {
                                                            value: /^[a-zA-Z\s]{3,}$/,
                                                            message: 'Nom invalide'
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                        {
                                            errors?.user?.last_name && <p className="text-red-500 text-sm">{errors?.user?.last_name.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="w-full">
                                    <InputLabel required htmlFor="email" className="text-base font-semibold">Adresse e-mail</InputLabel>
                                    <div className="relative flex items-center">
                                        <TextField
                                            type="email"
                                            id="email"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            placeholder="Entrer l'adresse e-mail"
                                            {
                                                ...register('user.email', {
                                                    required: 'Ce champ est requis',
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                        message: 'Adresse e-mail invalide'
                                                    }
                                                })
                                            }
                                        />
                                    </div>
                                    {
                                        errors?.user?.email && <p className="text-red-500 text-sm">{errors?.user?.email.message}</p>
                                    }
                                </div>
                                <div className="w-full">
                                    <InputLabel required htmlFor="phone" className="text-base font-semibold">Numero de telephone</InputLabel>
                                    <div className="relative flex items-center">
                                        <TextField
                                            type="tel"
                                            id="phone"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            placeholder="Enter le numero de telephone"
                                            {
                                                ...register('user.phone', {
                                                    required: 'Ce champ est requis',
                                                    pattern: {
                                                        value: /^[0-9]{8,14}$/,
                                                        message: 'Numero de telephone invalide'
                                                    }
                                                })
                                            }
                                        />
                                    </div>
                                    {
                                        errors?.user?.phone && <p className="text-red-500 text-sm">{errors?.user?.phone.message}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-[120px]">
                            <button type="submit" className="w-full p-2 font-bold text-white bg-blue-500 flex items-center justify-center rounded transition-all hover:bg-white border border-transparent hover:text-blue-500 hover:border-black">
                                {(isSubmitting) ? <Spinner style={{height: "24px", width: "24px"}} color='white' /> : "Envoyer"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full lg:w-1/2 overflow-hidden">
                {ReportMap}
            </div>
        </div>
    )
}
