import React from 'react'
import { getReportStatus } from '../utils/getReportStatus'
import { STATUS_COLORS } from '../../constants'

export default function Report({
    id,
    location,
    description,
    anomalie,
    date,
    status,
    photos,
}) {
    return (
        <div className="border flex items-center [&:hover_img]:scale-110 gap-2 border-black rounded">
            <div className="w-1/2 space-y-3 pl-4">
                <h3 className="text-xl font-bold">{location.label} <span className="text-base font-normal">({anomalie})</span></h3>
                <p className="text-lg line-clamp-4 mt-2">{description}</p>
                <p>Date: <span className="font-bold">{date}</span></p>
                <p>Etat: <span className="font-bold" style={{color: STATUS_COLORS[status]}}>{getReportStatus(status)}</span></p>
            </div>
            <div className="w-1/2 overflow-hidden h-[300px] flex items-center justify-center border border-l border-l-black">
                <img src={!!photos.length ? photos[0] : '/images/warning.png'} className="aspect-square object-cover h-full w-full transition-all" alt="Report" />
            </div>
        </div>
    )
}
