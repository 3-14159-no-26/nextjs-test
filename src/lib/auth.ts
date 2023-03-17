import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/lib/prisma'
import { user } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // 如果登入方式是 Google
      if (account.provider === 'google') {
        // 找第一個 email 匹配的紀錄
        const verified = await prisma.user.findFirst({
          // 條件
          where: {
            email: profile.email
          }
        })

        // 返回布林值
        return !!verified
      }


      return true;
    }
  },

  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt'
  }
}
