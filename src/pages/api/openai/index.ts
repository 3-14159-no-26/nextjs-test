import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

console.log('OPENAI_API_KEY', process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

// console.log('openaiClient', openai)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { content } = req.body
        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: content }],
            })
            // console.log('response', response)
            return res.status(200).json(response.data.choices[0].message)
        } catch (error) {
            return res.status(404).json({
                message: '資料不存在啦幹!',
                error: error,
            })
        }
    }
}
export default handler
