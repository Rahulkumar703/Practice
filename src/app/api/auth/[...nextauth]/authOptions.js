import User from "@/Models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { connect } from '@/lib/DB'

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {

                try {
                    connect();
                    const { email, password } = credentials;

                    const user = await User.findOne({ email: email }).select(['password', 'email', 'name', 'role'])

                    if (!user) {
                        throw new Error('You are not a Matrix member." 🤔');
                    }

                    const passwordMatched = await bcrypt.compare(password, user.password);

                    if (!passwordMatched) {
                        throw new Error('Looks like you forgot your password! 🤔');
                    }

                    return user;
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            return { ...session, user: { ...token } }
        }
    },
    pages: {
        signIn: '/',
    },
    session: {
        strategy: "jwt"
    },
}