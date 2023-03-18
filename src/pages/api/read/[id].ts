import prisma from '@/lib/prisma'
import { test } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    if (req.method === 'GET') {
        if (id == '0') {
            const data = await prisma.$queryRaw`SELECT * FROM test`
            return res.status(200).json(data)
        }
        
        const data = await prisma.$queryRaw`SELECT * FROM test WHERE id = ${id}`

        if (!!data) {
            return res.status(404).json({
                message: '資料不存在啦幹!'
            })
        }

        return res.status(200).json(data)
    }
}
export default handler
