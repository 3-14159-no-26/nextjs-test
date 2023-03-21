import prisma from '@/lib/prisma'
import { test } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    if (req.method === 'POST') {
        const { token, value } = req.body
        if (token == process.env.API_SQL_TOKEN) {
            const data =
                await prisma.$queryRaw`INSERT INTO test (value) VALUES (${value})`
            return res.status(200).json({ token, value })
        } else {
            return res.status(404).json({
                message: '資料不存在啦幹!',
            })
        }

        // const data =
        //     (await prisma.$queryRaw`SELECT * FROM test WHERE id = ${id}`) as test[]
    }
}
export default handler
