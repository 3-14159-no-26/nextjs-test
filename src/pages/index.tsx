import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import NavBar from '@/components/NavBar'
import Time from '@/components/Time'
import React from 'react'
import { useQuery } from 'react-query'

export default function Home() {
    const { isLoading, error, data } = useQuery(
        'data',
        () => fetch('/api/read/0').then((res) => res.json()),
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
                                <th>值</th>
                                <th>時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.value + 'Ω'}</td>
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
