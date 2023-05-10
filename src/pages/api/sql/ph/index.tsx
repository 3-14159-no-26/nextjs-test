import prisma from '@/lib/prisma'
import { ph } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

// 0~4 強酸性
// 4~6 弱酸性
// 6~8 中性
// 8~10 弱鹼性
// 10~14 強鹼性

const phValue = (value: number): string => {
    if (value >= 0 && value <= 4) {
        return '強酸性'
    } else if (value > 4 && value <= 6) {
        return '弱酸性'
    } else if (value > 6 && value <= 8) {
        return '中性'
    } else if (value > 8 && value <= 10) {
        return '弱鹼性'
    } else if (value > 10 && value <= 14) {
        return '強鹼性'
    } else {
        return '資料錯誤'
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { token, value } = req.body
        if (token == process.env.API_SQL_TOKEN) {
            const data =
                (await prisma.$queryRaw`INSERT INTO ph (value,status) VALUES (${value},${phValue(
                    value
                )})`) as ph[]
            const status = phValue(value)
            return res.status(200).json({ token, value, status })
        } else {
            return res.status(404).json({
                message: '資料不存在啦幹!',
            })
        }
    }
}
export default handler
