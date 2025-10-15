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

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [history, setHistory] = useState<History[]>([]);
    const [contest, setContest] = useState<ContestStats | null>(null);
    const [aiFeedback, setAiFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await axios.get("/api/leetcode/stats");
                console.log(res.data);
                setStats(res.data.stats);

                const hist = await axios.get("/api/leetcode/history");
                setHistory(hist.data.history);

                const contestRes = await axios.get("/api/leetcode/contest");
                setContest(contestRes.data.contest);

                const aiRes = await axios.get("/api/leetcode/ai-insights");
                setAiFeedback(
                    aiRes.data.aiFeedback || "No AI feedback available."
                );
            } catch (e) {
                console.error("Error fetching stats:", e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!stats) return <p>No stats available.</p>;

    return (
        <div className="p-6 space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-3">
                    AI Mentor Feedback 🤖
                </h2>
                {loading ? (
                    <p className="text-gray-500 italic">
                        Analyzing your performance...
                    </p>
                ) : (
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {aiFeedback}
                    </p>
                )}
            </div>
            <h1 className="text-3xl font-bold">Leetcode Dashboard</h1>

            <div className="flex items-center space-x-3 bg-white rounded-lg shadow px-4 py-2 w-fit">
                <span className="text-lg font-semibold text-gray-500">
                    Username:
                </span>
                <span className="text-2xl font-bold text-indigo-700">
                    {stats.username}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-neutral-100 rounded-xl shadow p-6">
                    <p className="text-gray-500">Total Solved</p>
                    <p className="text-3xl font-bold">{stats.totalSolved}</p>
                </div>
                <div className="bg-green-100 rounded-xl shadow p-6">
                    <p className="text-gray-700">Easy Solved</p>
                    <p className="text-2xl font-bold">{stats.easySolved}</p>
                </div>
                <div className="bg-yellow-100 rounded-xl shadow p-6">
                    <p className="text-gray-700">Medium Solved</p>
                    <p className="text-2xl font-bold">{stats.mediumSolved}</p>
                </div>
                <div className="bg-red-100 rounded-xl shadow p-6">
                    <p className="text-gray-700">Hard Solved</p>
                    <p className="text-2xl font-bold">{stats.hardSolved}</p>
                </div>
                <div className="bg-blue-100 rounded-xl shadow p-6">
                    <p className="text-gray-700">Ranking</p>
                    <p className="text-3xl font-bold">
                        #{stats.ranking ?? "N/A"}
                    </p>
                </div>
                <div className="bg-purple-100 rounded-xl shadow p-6">
                    <p className="text-gray-700">Contest Rating</p>
                    <p className="text-2xl font-bold">
                        {stats.contestRating ?? "N/A"}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Progress Over Time
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={history}>
                        <CartesianGrid stroke="#eee" />
                        <XAxis
                            dataKey="fetchedAt"
                            tickFormatter={(tick) =>
                                new Date(tick).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="totalSolved"
                            stroke="#2563eb"
                            strokeWidth={2}
                            name="Total"
                        />
                        <Line
                            type="monotone"
                            dataKey="easySolved"
                            stroke="#22c55e"
                            strokeWidth={2}
                            name="Easy"
                        />
                        <Line
                            type="monotone"
                            dataKey="mediumSolved"
                            stroke="#eab308"
                            strokeWidth={2}
                            name="Medium"
                        />
                        <Line
                            type="monotone"
                            dataKey="hardSolved"
                            stroke="#ef4444"
                            strokeWidth={2}
                            name="Hard"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {contest && (
                <div className="bg-white rounded-xl shadow p-6">
                    {" "}
                    <h2 className="text-xl font-semibold mb-4">
                        {" "}
                        Contest Stats{" "}
                    </h2>{" "}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {" "}
                        <div className="bg-blue-100 p-4 rounded-lg shadow">
                            {" "}
                            <p className="text-gray-700">
                                Contests Attended
                            </p>{" "}
                            <p className="text-2xl font-bold">
                                {" "}
                                {contest.attendedContests}{" "}
                            </p>{" "}
                        </div>{" "}
                        <div className="bg-purple-100 p-4 rounded-lg shadow">
                            {" "}
                            <p className="text-gray-700">Contest Rating</p>{" "}
                            <p className="text-2xl font-bold">
                                {" "}
                                {contest.rating ?? "N/A"}{" "}
                            </p>{" "}
                        </div>{" "}
                        <div className="bg-green-100 p-4 rounded-lg shadow">
                            {" "}
                            <p className="text-gray-700">Global Rank</p>{" "}
                            <p className="text-2xl font-bold">
                                {" "}
                                {contest.globalRanking ?? "N/A"}{" "}
                            </p>{" "}
                        </div>{" "}
                        <div className="bg-yellow-100 p-4 rounded-lg shadow">
                            {" "}
                            <p className="text-gray-700">Top %</p>{" "}
                            <p className="text-2xl font-bold">
                                {" "}
                                {contest.topPercentage?.toFixed(2)}%{" "}
                            </p>{" "}
                        </div>{" "}
                    </div>{" "}
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
