import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import NavBar from '@/components/NavBar'
import Time from '@/components/Time'

const Voice = () => {
    const { isLoading, error, data } = useQuery(
        'data',
        () =>
            fetch('/api/read/ph', {
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
        <>
            <NavBar />
            <div className="layout">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>PH值</th>
                                <th>性質</th>
                                <th>時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.value}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Time utctime={item.time as string} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
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
