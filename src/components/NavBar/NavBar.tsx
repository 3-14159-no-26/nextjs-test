import Link from 'next/link'
const NavBar = () => {
    return (
        <div className="flex justify-between items-center p-5 bg-slate-500">
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <div className="text-white">首頁</div>
                </Link>
                <Link href="/chat">
                    <div className="text-white">聊天</div>
                </Link>
                <Link href="/voice">
                    <div className="text-white">語音</div>
                </Link>
                <Link href="/ph">
                    <div className="text-white">PH值</div>
                </Link>
            </div>
            <div className="flex items-center space-x-2">
                <Link href="/api/auth/signout">
                    <div className="text-white">登出</div>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
