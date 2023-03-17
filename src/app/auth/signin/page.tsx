import Button from './Button'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import '@/app/style.css'

type SigninPageProps = {
  searchParams: {
    callbackUrl: string
  }
}

export default async function Signin({ searchParams }: SigninPageProps) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(searchParams.callbackUrl ?? '/')
  }

  return (
    <>
      <div className="layout">
        <div className="login">
          <h1>登入頁面</h1>
          <Button />
        </div>
      </div>

    </>
  )
}