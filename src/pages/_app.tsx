import '@/style.css'
import '@/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </SessionProvider>
    )
}
