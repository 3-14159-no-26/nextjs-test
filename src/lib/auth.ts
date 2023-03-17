import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
      const verified = ['jeter.nice@gmail.com', 'lainelson411@gmail.com']

      if (account.provider === 'google') {
        return verified.includes(profile.email)
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
