import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import NavBar from '@/components/NavBar'

const Chat = () => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [changes, setChanges] = useState(1)

    const send = async () => {
        console.log('input', input)
        setLoading(true)
        const data = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: input }),
        })
        const res = await data.json()
        // console.log('res', res)
        setLoading(false)
        setMessages([...messages, input, res.content])
        setInput('')
    }

    const handleKeyDown = (event) => {
        // 如果是手機版，就不要做任何事情
        if (window.innerWidth < 768) return
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            send()
        } else if (event.key === 'Enter' && event.shiftKey) {
            console.log(changes)

            if (changes > 2) return
            setChanges(changes + 1)
        }
    }

    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center">
                <div className=" bg-slate-300 rounded-lg w-full p-10 mt-10 md:m-20 relative">
                    <div className="title">
                        <div className="text-2xl font-bold">OpenAI Chat</div>
                    </div>
                    <div className="h-96 bg-white rounded-md mb-5 overflow-y-auto">
                        {messages.map((message, index) => (
                            <>
                                <div key={index} className="p-2 border-b">
                                    {message}
                                </div>
                            </>
                        ))}
                        {input && (
                            <div className="p-2 border-b input">{input}</div>
                        )}
                        {loading && (
                            <div className="p-2 color-gray-400">Loading...</div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <textarea
                            className="w-4/5 p-2 border rounded-md h-full"
                            rows={changes}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="text-white bg-sky-700 p-2 rounded-md hover:bg-sky-500 w-1/5 h-full"
                            onClick={send}
                        >
                            傳送
                        </button>
                        <div className="absolute bottom-0 right-1 text-xs text-gray-400">
                            Powered by OpenAI & 唯一
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat

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
