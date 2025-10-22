"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Brain, Sparkles } from "lucide-react";

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (session?.user) {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Panel - Features */}
            <div className="hidden md:flex lg:w-1/2 bg-gradient-to-br from-slate-800/50 via-slate-900 to-slate-950 items-center justify-center p-4 md:p-6 lg:p-12 border-r border-slate-700/40">
                <div className="max-w-lg w-full">
                    <div className="mb-6 lg:mb-10">
                        <div className="flex items-center gap-4 mb-6 lg:mb-8">
                            <div className="relative w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl ring-1 ring-slate-700">
                                <Brain
                                    className="w-8 h-8 text-white"
                                    strokeWidth={2.5}
                                />
                                <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
                            </div>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
                                    LeetMentor AI
                                </h2>
                            </div>
                        </div>
                        <p className="text-base lg:text-lg text-slate-400 leading-relaxed mb-4 lg:mb-6">
                            Elevate your LeetCode journey with AI-powered
                            insights. Track your progress, analyze patterns, and
                            unlock your full potential with personalized
                            mentorship from your AI companion.
                        </p>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                        <div className="flex items-center space-x-3 lg:space-x-4 bg-slate-800/60 backdrop-blur-sm p-3 lg:p-4 rounded-xl border border-slate-600/40 hover:bg-slate-800/80 hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-700/20">
                            <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2 lg:p-3 rounded-lg shadow-md flex-shrink-0">
                                <span className="text-xl lg:text-2xl">🧠</span>
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-slate-100 mb-1 text-sm lg:text-base">
                                    AI-Powered Mentorship
                                </h3>
                                <p className="text-slate-300 text-xs lg:text-sm">
                                    Get personalized recommendations based on
                                    your LeetCode solving patterns
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 lg:space-x-4 bg-slate-800/60 backdrop-blur-sm p-3 lg:p-4 rounded-xl border border-slate-600/40 hover:bg-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-700/20">
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 lg:p-3 rounded-lg shadow-md flex-shrink-0">
                                <span className="text-xl lg:text-2xl">📈</span>
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-slate-100 mb-1 text-sm lg:text-base">
                                    LeetCode Analytics
                                </h3>
                                <p className="text-slate-300 text-xs lg:text-sm">
                                    Visualize your problem-solving growth with
                                    detailed performance metrics
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 lg:space-x-4 bg-slate-800/60 backdrop-blur-sm p-3 lg:p-4 rounded-xl border border-slate-600/40 hover:bg-slate-800/80 hover:border-pink-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-700/20">
                            <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 p-2 lg:p-3 rounded-lg shadow-md flex-shrink-0">
                                <span className="text-xl lg:text-2xl">⚡</span>
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-slate-100 mb-1 text-sm lg:text-base">
                                    Smart Problem Suggestions
                                </h3>
                                <p className="text-slate-300 text-xs lg:text-sm">
                                    Stay motivated with intelligent next-problem
                                    recommendations
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 lg:mt-8 p-4 lg:p-5 bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm rounded-2xl border border-violet-500/20 shadow-xl">
                        <p className="text-slate-200 italic text-center mb-2 text-xs lg:text-sm">
                            Every test case passed is confidence built. Every
                            edge case handled is mastery achieved.
                        </p>
                        <p className="text-violet-300 text-xs text-center font-medium">
                            — LeetMentor AI
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 overflow-y-auto min-h-screen lg:min-h-0">
                <div className="w-full max-w-md">
                    {/* Mobile Header */}
                    <div className="text-center mb-6 md:hidden">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="relative w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Brain
                                    className="w-6 h-6 text-white"
                                    strokeWidth={2.5}
                                />
                                <Sparkles className="w-3 h-3 text-white absolute -top-0.5 -right-0.5" />
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                                CodeMentor AI
                            </h1>
                        </div>
                    </div>

                    {/* Tablet Header */}
                    <div className="text-center mb-6 hidden md:block lg:hidden">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="relative w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Brain
                                    className="w-7 h-7 text-white"
                                    strokeWidth={2.5}
                                />
                                <Sparkles className="w-3.5 h-3.5 text-white absolute -top-0.5 -right-0.5" />
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                                CodeMentor AI
                            </h1>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Transform your coding journey with AI insights
                        </p>
                    </div>

                    {/* Login Card */}
                    <div className="bg-gradient-to-b from-slate-900/80 to-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-800/60">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3">
                                Welcome Back
                            </h2>
                            <p className="text-sm sm:text-base text-slate-400">
                                Continue your coding excellence journey
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/50 text-rose-400 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* OAuth Buttons */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => signIn("google")}
                                className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-xl transition-all duration-200 text-slate-100 font-medium shadow-sm text-sm sm:text-base cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="truncate">
                                    Continue with Google
                                </span>
                            </button>
                            {/* 
                            <button
                                onClick={() => signIn("github")}
                                className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-xl transition-all duration-200 text-slate-100 font-medium shadow-sm text-sm sm:text-base cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span className="truncate">
                                    Continue with GitHub
                                </span>
                            </button> */}
                        </div>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800/60"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-4 bg-slate-900 text-slate-500 font-medium uppercase tracking-wider">
                                    Or with email
                                </span>
                            </div>
                        </div>

                        {/* Credentials Form */}
                        <form
                            onSubmit={handleCredentialsLogin}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-medium text-slate-400 mb-2"
                                >
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-slate-400 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium text-slate-400 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800/60 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.01] text-sm sm:text-base cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                                Sign in / Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
