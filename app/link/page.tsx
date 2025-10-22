"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LinkPage() {
    const { status } = useSession();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-slate-700 border-t-slate-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm font-medium text-slate-400">
                        Verifying authentication...
                    </p>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post("/api/link-username", {
                leetcodeUsername: username,
            });
            if (res.status === 200) {
                router.push("/dashboard");
            }
        } catch (err) {
            console.log(err);
            setError(
                "Failed to link username. Please verify your LeetCode username and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 sm:py-12">
            <div className="w-full max-w-lg">
                <div className="text-center mb-6 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2 sm:mb-3 tracking-tight px-2">
                        Connect LeetCode Account
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400 px-4">
                        Link your profile to unlock personalized analytics and
                        AI insights
                    </p>
                </div>

                <div className="bg-slate-900/70 border border-slate-800/60 rounded-2xl shadow-xl p-6 sm:p-8">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 sm:space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="leetcode-username"
                                className="block text-sm font-medium text-slate-300 mb-2 sm:mb-3"
                            >
                                LeetCode Username
                            </label>
                            <input
                                id="leetcode-username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your LeetCode username"
                                className="w-full px-4 py-3 sm:py-3.5 bg-slate-950/40 border border-slate-700/60 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-800/50 rounded-lg px-4 py-3">
                                <p className="text-red-400 text-xs sm:text-sm">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 sm:py-3.5 rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 text-sm sm:text-base"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Connecting...
                                </span>
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </form>

                    <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800/60">
                        <p className="text-xs text-slate-500 text-center leading-relaxed px-2">
                            You can find your username in your LeetCode profile
                            URL:
                            <br />
                            <span className="text-slate-400 font-mono text-xs break-all">
                                leetcode.com/u/your-username
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
