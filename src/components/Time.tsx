import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { utcToZonedTime } from 'date-fns-tz'

const Time = ({ utctime }: { utctime: string }) => {
    const [time, setTime] = useState('')

    useEffect(() => {
        const utcTime = new Date(utctime)
        const scoresbysundTime = utcToZonedTime(utcTime, 'America/Scoresbysund')
        const formattedTime = format(
            scoresbysundTime,
            'yyyy/MM/dd a hh:mm:ss',
            {
                locale: zhTW, // 請確保已引入中文語言包
            }
        )
        setTime(formattedTime)
    }, [utctime])

    return (
        <>
            <div className="">{time}</div>
        </>
    )
}

export default Time
