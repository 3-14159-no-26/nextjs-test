import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const Voice = () => {
    const { isLoading, error, data } = useQuery(
        'data',
        () =>
            fetch('/api/read/voice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: 'User.-.0987' }),
            }).then((res) => res.json()),
        { refetchInterval: 0 }
    )

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error fetching data</div>

    return (
        <div className="layout">
            <div className="message">
                {data.map((item) => {
                    const utcTime = new Date(item.time)
                    // console.log(utcTime)
                    //
                    const taipeiTime = utcToZonedTime(
                        utcTime,
                        'America/Scoresbysund'
                    )
                    console.log(taipeiTime)

                    const formattedTime = format(
                        taipeiTime,
                        'yyyy-MM-dd HH:mm:ss'
                    )

                    return (
                        <div key={item.id}>
                            <div className="content">
                                <div className="">{item.message}</div>
                                <div className="">{formattedTime}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Voice
