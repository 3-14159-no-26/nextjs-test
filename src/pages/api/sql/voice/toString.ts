import prisma from '@/lib/prisma'
import { voice } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { token, value } = req.body
        if (token == process.env.API_SQL_TOKEN) {
            const data =
                (await prisma.$queryRaw`INSERT INTO voice (message) VALUES (${value})`) as voice[]
            return res.status(200).json({ token, value })
        } else {
            return res.status(404).json({
                message: '資料不存在啦幹!',
            })
        }
    }
}
export default handler
