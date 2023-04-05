import { test } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Item from '@/components/Item'
import React from 'react'

export default function Home() {
    const [data, setData] = React.useState<test[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/read/0')
            const data = await res.json()
            setData(data)
        }
        fetchData()
    }, [data])

    return (
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
                            <Item key={item.id} {...item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
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
