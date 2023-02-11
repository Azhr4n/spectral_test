import React from 'react'
import { useState, useEffect } from 'react'
import { DateTime, ToObjectOutput } from 'luxon'

import { Times } from './types'

import './styles.css'
 
const handleBeauty = (time: number): string => {
    if (time < 10) return `0${time}`;
    return `${time}`;
}

const DateComponent = ({ date }: { date: ToObjectOutput}) => {
    return <div><span>{`${date.day}/${date.month}/${date.year} ${handleBeauty(date.hour)}:${handleBeauty(date.minute)}:${handleBeauty(date.second)}`}</span></div>
}

export const Header = () => {
    const [times, setTimes] = useState<Times | undefined>(undefined);
    useEffect(() => {
        setTimes({
            paris: DateTime.now().setZone('Europe/Paris').toObject(),
            shanghai: DateTime.now().setZone('Asia/Shanghai').toObject()
        });
        setInterval(() => {
            setTimes({
                paris: DateTime.now().setZone('Europe/Paris').toObject(),
                shanghai: DateTime.now().setZone('Asia/Shanghai').toObject()
            })
        }, 1000);
    }, [])

    if (!times) return null;
    return <div className='timezonesContainer'>
        <div className='timezone'><span>Paris</span><DateComponent date={times.paris} /></div>
        <div className='timezone'><span>Shanghai</span><DateComponent date={times.shanghai} /></div>
    </div>
}