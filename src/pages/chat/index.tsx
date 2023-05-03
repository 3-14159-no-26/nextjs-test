import { useState, useEffect, useRef } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import NavBar from '@/components/NavBar'
import { IconSend, IconMicrophone } from '@tabler/icons-react'

const Chat = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [changes, setChanges] = useState(1)
    const inputRef = useRef(null)
    useEffect(() => {
        console.log(
            'webkitSpeechRecognition',
            'webkitSpeechRecognition' in window
        )

        console.log('SpeechRecognition', 'SpeechRecognition' in window)

        if (!('webkitSpeechRecognition' in window)) {
            alert('您的瀏覽器不支持語音輸入')
            return
        }
    }, [])
    const send = async () => {
        console.log('input', inputRef.current.value)
        setLoading(true)
        const data = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: inputRef.current.value }),
        })
        const res = await data.json()
        voiceOutput(res.content)
        setLoading(false)
        setMessages([...messages, inputRef.current.value, res.content])
        inputRef.current.value = ''
    }

    const voiceInput = () => {
        console.log('voiceInput')

        if (!('webkitSpeechRecognition' in window)) {
            alert('您的瀏覽器不支持語音輸入')
            return
        }
        const recognition =
            new (window as any).webkitSpeechRecognition() ||
            (window as any).SpeechRecognition()

        // 設置語言為中文
        recognition.lang = 'zh-TW'

        // 設置連續語音辨識
        // recognition.continuous = true

        // 設置語音辨識事件處理器
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript
            console.log('輸入的文本：', transcript)
            setValue(transcript)
            inputRef.current.value = transcript
        }

        recognition.start()
    }

    const voiceOutput = (content) => {
        const msg = new SpeechSynthesisUtterance(content)
        // msg.lang = 'zh-TW'
        const synth = window.speechSynthesis
        let voices = synth.getVoices()

        for (let index = 0; index < voices.length; index++) {
            // console.log(voices[index].name)
            if (
                voices[index].name ==
                'Microsoft Yunxi Online (Natural) - Chinese (Mainland)'
            ) {
                //HsiaoChen (Neural) - 曉臻 (MS Edge專用)
                msg.voice = voices[index]
                break
            } else if (voices[index].name == 'Google 國語（臺灣）') {
                //Chrome專用
                msg.voice = voices[index]
                break
            } else {
                //u.lang = 'zh-TW'; //這邊可能會有語音又被切回系統語音的問題
            }

            //當最後一個都還沒找到時才設u.lang
            if (index + 1 === voices.length) {
                msg.lang = 'zh-CN'
            }
        }
        window.speechSynthesis.speak(msg)
    }

    // voiceOutput('歡迎使用語音輸入')
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
                    <div className="title flex justify-between p-2 items-center">
                        <div className="text-2xl font-bold">OpenAI Chat</div>
                        <div className="text-gray-400">
                            請使用 Chrome 或是 Edge
                        </div>
                    </div>
                    <div className="h-96 bg-white rounded-md mb-5 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className="p-2 border-b">
                                {message}
                            </div>
                        ))}
                        {loading && (
                            <div className="p-2 color-gray-400">Loading...</div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <textarea
                            className="w-4/5 p-2 border rounded-md h-full"
                            rows={changes}
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="text-white bg-sky-700 p-2 rounded-md hover:bg-sky-500 h-full"
                            onClick={send}
                        >
                            <IconSend size={25} />
                        </button>
                        {/* 語音輸入 */}
                        <button
                            className="text-white bg-sky-700 p-2 rounded-md hover:bg-sky-500 h-full"
                            onClick={voiceInput}
                        >
                            <IconMicrophone size={25} />
                        </button>

                        <div className="absolute bottom-0 right-1 text-xs text-gray-400">
                            Powered by OpenAI & 唯一
                        </div>
                    </div>
                    <p>語音辨識 {value}</p>
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
