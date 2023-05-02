import Link from 'next/link'
const NavBar = () => {
    return (
        <div className="flex justify-between items-center p-5 bg-slate-500">
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <div className="text-white">Home</div>
                </Link>
                <Link href="/chat">
                    <div className="text-white">Chat</div>
                </Link>
                <Link href="/voice">
                    <div className="text-white">Voice</div>
                </Link>
            </div>
            <div className="flex items-center space-x-2">
                <Link href="/api/auth/signout">
                    <div className="text-white">Sign out</div>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
