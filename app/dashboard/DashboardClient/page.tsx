"use client";

import ProblemDistributionChart from "@/components/ProblemDistributionChart";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChevronDown, ChevronUp, Code2 } from "lucide-react";

interface Stats {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    contestRating?: number;
}

interface History {
    fetchedAt: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
}
interface ContestStats {
    attendedContests: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
    history: {
        title: string;
        startTime: string;
        rating: number;
        ranking: number;
    }[];
}
interface Topic {
    name: string;
    solved: number;
}

export default function DashboardClient() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [history, setHistory] = useState<History[]>([]);
    const [contest, setContest] = useState<ContestStats | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [aiFeedback, setAiFeedback] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await axios.get("/api/leetcode/stats");
                setStats(res.data.stats);

                const hist = await axios.get("/api/leetcode/history");
                setHistory(hist.data.history);

                const contestRes = await axios.get("/api/leetcode/contest");
                setContest(contestRes.data.contest);

                const topicsRes = await axios.get("/api/leetcode/topics");
                setTopics(topicsRes.data.topics || []);
            } catch (e) {
                console.error("Error fetching stats:", e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    const fetchAiFeedback = async () => {
        if (aiFeedback) return;
        setAiLoading(true);
        try {
            const aiRes = await axios.get("/api/leetcode/ai-insights");
            setAiFeedback(aiRes.data.aiFeedback || "No AI feedback available.");
        } catch (e) {
            console.error("Error fetching AI feedback:", e);
        } finally {
            setAiLoading(false);
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-slate-700 border-t-slate-300 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm font-medium text-slate-400">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    if (!stats)
        return (
            <div className="flex items-center justify-center min-h-screen px-4">
                <p className="text-sm font-medium text-slate-400">
                    No stats available.
                </p>
            </div>
        );

    return (
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 pb-8 sm:pb-12 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-900 border border-slate-800/60 rounded-xl sm:rounded-2xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
                <button
                    onClick={() => {
                        setShowFeedback(!showFeedback);
                        if (!showFeedback) fetchAiFeedback();
                    }}
                    aria-expanded={showFeedback}
                    className="flex items-center justify-between w-full text-left px-4 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors duration-200 hover:bg-slate-800/50"
                >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm ring-1 ring-slate-800 flex-shrink-0">
                            <Code2
                                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                                strokeWidth={2.5}
                            />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-sm sm:text-base font-semibold text-slate-100 leading-tight">
                                AI Mentor Insights
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                                Smart suggestions tailored to your progress
                            </p>
                        </div>
                    </div>

                    <div className="text-slate-400 transition-transform duration-200 cursor-pointer flex-shrink-0">
                        {showFeedback ? (
                            <ChevronUp size={18} className="sm:w-5 sm:h-5" />
                        ) : (
                            <ChevronDown size={18} className="sm:w-5 sm:h-5" />
                        )}
                    </div>
                </button>

                {showFeedback && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 border-t border-slate-800/60 bg-slate-900/60">
                        {aiLoading ? (
                            <div className="flex items-center gap-3 text-slate-400 text-sm py-3 sm:py-4">
                                <div className="w-4 h-4 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin" />
                                <p>Analyzing your progress...</p>
                            </div>
                        ) : (
                            <div className="py-3 sm:py-4">
                                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {aiFeedback}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                        Performance Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Track your coding journey
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900/70 border border-slate-800 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 transition transform hover:scale-[1.01] hover:border-slate-700 focus-within:ring-2 focus-within:ring-violet-400 self-start sm:self-auto">
                    <span className="text-xs font-medium text-slate-500">
                        @
                    </span>
                    <span className="text-sm font-semibold text-slate-100 truncate max-w-[10rem] sm:max-w-[12rem]">
                        {stats.username}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="bg-slate-900/70 border border-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-transform duration-200 transform hover:scale-105 hover:shadow-lg">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 sm:mb-2">
                        Total
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-100">
                        {stats.totalSolved}
                    </p>
                </div>
                <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border-l-4 border-emerald-500 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-transform duration-200 transform hover:scale-105 hover:shadow-lg group">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-2 group-hover:text-emerald-300 transition-colors duration-200">
                        Easy
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
                        {stats.easySolved}
                    </p>
                </div>
                <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border-l-4 border-amber-400 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-transform duration-200 transform hover:scale-105 hover:shadow-lg group">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-2 group-hover:text-amber-300 transition-colors duration-200">
                        Medium
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-amber-400">
                        {stats.mediumSolved}
                    </p>
                </div>
                <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border-l-4 border-rose-500 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-transform duration-200 transform hover:scale-105 hover:shadow-lg group">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-2 group-hover:text-rose-300 transition-colors duration-200">
                        Hard
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-rose-400">
                        {stats.hardSolved}
                    </p>
                </div>
                <div className="bg-slate-900/70 border border-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-transform duration-200 transform hover:scale-105 hover:shadow-lg">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 sm:mb-2">
                        Ranking
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-100">
                        {stats.ranking
                            ? `#${stats.ranking.toLocaleString()}`
                            : "N/A"}
                    </p>
                </div>
                <div className="bg-slate-900/70 border border-slate-800/60 rounded-lg sm:rounded-xl p-3 sm:p-5 transition-transform duration-200 transform hover:scale-105 hover:shadow-lg">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 sm:mb-2">
                        Rating
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-100">
                        {stats.contestRating ?? "N/A"}
                    </p>
                </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-4 sm:mb-5">
                    Progress Timeline
                </h2>
                <div className="bg-slate-950/40 rounded-lg p-2 sm:p-4 backdrop-blur-sm -mx-2 sm:mx-0">
                    <ResponsiveContainer
                        width="100%"
                        height={250}
                        className="sm:hidden"
                    >
                        <LineChart data={history}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1f2937"
                            />
                            <XAxis
                                dataKey="fetchedAt"
                                tickFormatter={(tick) =>
                                    new Date(tick).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }
                                stroke="#64748b"
                                style={{ fontSize: "10px" }}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                stroke="#64748b"
                                style={{ fontSize: "10px" }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0b1220",
                                    border: "1px solid #334155",
                                    borderRadius: "0.5rem",
                                    color: "#f1f5f9",
                                    fontSize: "11px",
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: "10px" }} />
                            <Line
                                type="monotone"
                                dataKey="totalSolved"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                name="Total"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="easySolved"
                                stroke="#34d399"
                                strokeWidth={2}
                                name="Easy"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="mediumSolved"
                                stroke="#fbbf24"
                                strokeWidth={2}
                                name="Medium"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="hardSolved"
                                stroke="#fb7185"
                                strokeWidth={2}
                                name="Hard"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                        className="hidden sm:block"
                    >
                        <LineChart data={history}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#1f2937"
                            />
                            <XAxis
                                dataKey="fetchedAt"
                                tickFormatter={(tick) =>
                                    new Date(tick).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }
                                stroke="#64748b"
                                style={{ fontSize: "12px" }}
                            />
                            <YAxis
                                stroke="#64748b"
                                style={{ fontSize: "12px" }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0b1220",
                                    border: "1px solid #334155",
                                    borderRadius: "0.5rem",
                                    color: "#f1f5f9",
                                    fontSize: "12px",
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                            <Line
                                type="monotone"
                                dataKey="totalSolved"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                name="Total"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="easySolved"
                                stroke="#34d399"
                                strokeWidth={2}
                                name="Easy"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="mediumSolved"
                                stroke="#fbbf24"
                                strokeWidth={2}
                                name="Medium"
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="hardSolved"
                                stroke="#fb7185"
                                strokeWidth={2}
                                name="Hard"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {contest && (
                <div className="bg-slate-900/70 border border-slate-800/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-4 sm:mb-5">
                        Contest Performance
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-slate-950/30 p-3 sm:p-5 rounded-lg sm:rounded-xl border border-slate-800/60 transition-transform duration-200 transform hover:scale-102 hover:border-slate-700">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-2">
                                Attended
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-100">
                                {contest.attendedContests}
                            </p>
                        </div>
                        <div className="bg-slate-950/30 p-3 sm:p-5 rounded-lg sm:rounded-xl border border-slate-800/60 transition-transform duration-200 transform hover:scale-102 hover:border-slate-700">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-2">
                                Rating
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-100">
                                {contest.rating ?? "N/A"}
                            </p>
                        </div>
                        <div className="bg-slate-950/30 p-3 sm:p-5 rounded-lg sm:rounded-xl border border-slate-800/60 transition-transform duration-200 transform hover:scale-102 hover:border-slate-700">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-2">
                                Global Rank
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-100">
                                {contest.globalRanking
                                    ? `#${contest.globalRanking.toLocaleString()}`
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="bg-slate-950/30 p-3 sm:p-5 rounded-lg sm:rounded-xl border border-slate-800/60 transition-transform duration-200 transform hover:scale-102 hover:border-slate-700">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 sm:mb-2">
                                Top
                            </p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-100">
                                {contest.topPercentage?.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {topics.length > 0 && (
                <div className="bg-slate-900/70 border border-slate-800/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-4 sm:mb-5">
                        Topic Distribution
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {topics.map((t, index) => (
                            <div
                                key={`${t.name}-${index}`}
                                className="bg-slate-950/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-800/60 transition-transform duration-200 transform hover:scale-102 hover:border-slate-700"
                            >
                                <p className="text-xs font-medium text-slate-400 mb-1 truncate">
                                    {t.name}
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-slate-100">
                                    {t.solved}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ProblemDistributionChart
                easy={stats.easySolved}
                medium={stats.mediumSolved}
                hard={stats.hardSolved}
            />
        </div>
    );
}
