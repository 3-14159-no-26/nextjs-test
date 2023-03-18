import prisma from '@/lib/prisma'
import { test } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { format } from 'date-fns'

export default function Home({ data }: { data: test[] }) {
  console.log(data)

  return (
    <div className="layout">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>值</th>
              <th>時間</th>
            </tr>
          </thead>
          <tbody>
            {/* {data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.value + 'Ω'}</td>
                <td>{format(new Date(item.time), 'yyyy-MM-dd HH:mm:ss')}</td>
              </tr>
            ))} */}
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

  const data = JSON.parse(JSON.stringify(await prisma.$queryRaw`SELECT * FROM test` as test[]))
  // let data = (await prisma.$queryRaw`SELECT * FROM test`) as test[]
  // data = JSON.parse(JSON.stringify(data))

  return {
    props: {
      data,
    },
  }
}
