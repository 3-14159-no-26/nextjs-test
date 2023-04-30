import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Time from '@/components/Time'

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
                            <Time utctime={item.time as string} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Voice

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req } = ctx
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: { destination: '/api/auth/signin' },
            props: {},
        }
    }

    return {
        props: {},
    }
}
