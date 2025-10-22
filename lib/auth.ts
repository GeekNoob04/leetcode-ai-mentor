import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const NEXT_AUTH: AuthOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Your name" },
                username: {
                    label: "Email",
                    type: "text",
                    placeholder: "email@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                let user = await prisma.user.findUnique({
                    where: { email: credentials.username },
                });

                if (user) {
                    if (!user.password) return null;

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValid) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        image: null,
                    };
                } else {
                    try {
                        const hashedPassword = await bcrypt.hash(
                            credentials.password,
                            12
                        );
                        user = await prisma.user.create({
                            data: {
                                email: credentials.username,
                                name: credentials.name || "User",
                                password: hashedPassword,
                            },
                        });

                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            image: null,
                        };
                    } catch {
                        return null;
                    }
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (!token?.id) return session;

            const userInDb = await prisma.user.findUnique({
                where: { id: token.id as string },
                select: { leetcodeUsername: true },
            });

            session.user = {
                id: token.id,
                name: token.name || "User",
                email: token.email,
                image: session.user?.image || null,
                leetcodeUsername: userInDb?.leetcodeUsername || null,
            };

            return session;
        },

        async redirect({ url, baseUrl }) {
            if (url.includes("/login")) return url;
            if (url.startsWith(baseUrl)) return `${baseUrl}/link`;
            return `${baseUrl}/link`;
        },

        async signIn({ user, account }) {
            if (
                account?.provider === "google" ||
                account?.provider === "github"
            ) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });

                if (existingUser) {
                    const existingAccount = await prisma.account.findFirst({
                        where: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        },
                    });

                    if (!existingAccount) {
                        await prisma.account.create({
                            data: {
                                userId: existingUser.id,
                                provider: account.provider,
                                type: account.type,
                                providerAccountId: account.providerAccountId,
                                access_token: account.access_token,
                                token_type: account.token_type,
                                scope: account.scope,
                                id_token: account.id_token,
                            },
                        });
                    }
                }
            }
            return true;
        },
    },

    session: {
        strategy: "jwt" as const,
    },

    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
