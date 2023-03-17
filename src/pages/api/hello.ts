import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, id } = req.body
    console.log(name, id)

    return res.status(200).json({
      message: 'Your method is POST'
    })
  }

  // 不是你想要的請求方法就返回
  return res.status(400).end('Bad request')
}