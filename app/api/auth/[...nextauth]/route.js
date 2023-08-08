import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import User from '@models/user'
import { connectToDB } from '@utils/database'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 500000
      }
    })
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    //   httpOptions: {
    //     timeout: 40000,
    //   }
    // })
  ],
  callbacks: {
    //验证成功后自定义session
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser?._id.toString()
      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()

        //检查用户是否存在
        const userExists = await User.findOne({ email: profile.email })

        //不存在创建一个新用户存储进去
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.avatar_url
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
