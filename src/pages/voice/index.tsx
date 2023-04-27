import { format } from 'date-fns'
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
                {data.map((item) => (
                    <div key={item.id}>
                        <div className="content">
                            <div className="">{item.message}</div>
                            <div className="">
                                {format(
                                    new Date(item.time),
                                    'yyyy-MM-dd HH:mm:ss'
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Voice
