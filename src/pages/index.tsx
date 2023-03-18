import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'
import { test } from '@prisma/client'

export default function Home({ data }: { data: test[] }) {

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
            {data.map((item) => (
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: { destination: '/api/auth/signin' },
      props: {},
    }
  }

  const data = await prisma.$queryRaw`SELECT * FROM test` as test[]

  return {
    props: {
      data
    },
  }
}
