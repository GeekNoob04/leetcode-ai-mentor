import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./Providers/SessionProvider";

export const metadata: Metadata = {
    title: "LeetMentor AI",
    description: "AI-based LeetCode mentor and analytics dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}
