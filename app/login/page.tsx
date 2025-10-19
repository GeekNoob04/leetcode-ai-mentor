"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

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
    async function handleCredentialsLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const res = await signIn("credentials", {
            redirect: false,
            username: email,
            password,
            name,
        });
        if (res?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/link");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
            <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center space-y-6">
                <h2 className="text-2xl font-semibold">
                    Welcome to CodeMentor AI
                </h2>
                <div className="space-y-3">
                    <button
                        onClick={() => signIn("google")}
                        className="bg-red-600 hover:bg-red-700 w-full px-6 py-2 rounded-md font-medium"
                    >
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => signIn("github")}
                        className="bg-gray-700 hover:bg-gray-800 w-full px-6 py-2 rounded-md font-medium"
                    >
                        Sign in with GitHub
                    </button>
                </div>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-600"></span>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-800 px-2 text-gray-400">
                            or continue with email
                        </span>
                    </div>
                </div>
                <form onSubmit={handleCredentialsLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                        required
                    />
                    {error && (
                        <p className="text-red-400 text-sm text-center">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 w-full px-6 py-2 rounded-md font-medium"
                    >
                        Sign in / Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}
