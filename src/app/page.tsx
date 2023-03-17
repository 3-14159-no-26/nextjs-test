import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import './style.css'
import { test } from '@prisma/client'

async function getData() {
  // const data = await prisma.test.findMany()
  const data = await prisma.$queryRaw`SELECT * FROM test` as test[]

  return data
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/api/auth/signin')
  }

  const test = await getData()

  return (
    <div className="layout">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>user</th>
              <th>content</th>
            </tr>
          </thead>
          <tbody>
            {test.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user}</td>
                <td>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
