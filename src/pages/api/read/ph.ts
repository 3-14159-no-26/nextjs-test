import prisma from '@/lib/prisma'
import { ph } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { token } = req.body
        if (token == process.env.API_SQL_TOKEN) {
            const data = (await prisma.$queryRaw`SELECT * FROM ph`) as ph[]
            return res.status(200).json(data)
        } else {
            return res.status(404).json({
                message: '資料不存在啦幹!',
            })
        }
    }
}
export default handler
