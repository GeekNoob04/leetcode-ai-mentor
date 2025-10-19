"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            // Check if user has linked their LeetCode username
            if (session.user.leetcodeUsername) {
                router.push("/dashboard");
            } else {
                router.push("/link");
            }
        }
    }, [session, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center space-y-6">
                <h2 className="text-2xl font-semibold">
                    Welcome to CodeMentor AI
                </h2>
                <button
                    onClick={() => signIn("google")}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md"
                >
                    Sign in with Google
                </button>
                <button
                    onClick={() => signIn("github")}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md"
                >
                    Sign in with Github
                </button>
            </div>
        </div>
    );
}
