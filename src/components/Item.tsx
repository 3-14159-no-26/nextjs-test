import { test } from '@prisma/client'
import { format } from 'date-fns'
import React from 'react'

export default function Item(item: test) {
    const [date, setDate] = React.useState('')

    React.useEffect(() => {
        setDate(format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss'))
    }, [])

    return (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.value + 'Ω'}</td>
            <td>{date}</td>
        </tr>
    )
}
