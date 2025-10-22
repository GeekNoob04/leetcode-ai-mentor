"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, LogOut, Sparkles, Unlink } from "lucide-react";

export default function Navbar({
    user,
}: {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        leetcodeUsername?: string | null;
        id: string;
    };
}) {
    const router = useRouter();
    async function handleUnlink() {
        try {
            await axios.delete("/api/leetcode/unlink");
            router.push("/link");
        } catch (e) {
            console.error("Error unlinking account:", e);
        }
    }
    return (
        <nav className="w-full bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-slate-800/60 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link
                        href="/dashboard"
                        className="group flex items-center gap-2 transition-all duration-200 hover:scale-105"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg ring-1 ring-slate-700 group-hover:shadow-violet-500/30 transition-shadow duration-200">
                                <Brain
                                    className="w-5 h-5 text-white"
                                    strokeWidth={2.5}
                                />
                                <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-0.5 -right-0.5" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                                LeetMentor AI
                            </span>
                        </div>
                    </Link>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Welcome Message */}
                        <div className="hidden sm:flex items-center gap-2 bg-slate-800/40 border border-slate-700/50 rounded-lg px-4 py-2">
                            <span className="text-xs font-medium text-slate-400">
                                Welcome
                            </span>
                            <span className="text-sm font-semibold text-slate-100 max-w-[10rem] truncate">
                                {user?.name}
                            </span>
                        </div>

                        {/* Unlink Button */}
                        <button
                            onClick={handleUnlink}
                            className="flex items-center gap-2 bg-slate-800/60 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/50 font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 cursor-pointer"
                        >
                            <Unlink size={16} />
                            <span className="text-sm hidden sm:inline">
                                Unlink
                            </span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 cursor-pointer"
                        >
                            <LogOut size={16} />
                            <span className="text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
