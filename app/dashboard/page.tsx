"use client";
import ProblemDistributionChart from "@/components/ProblemDistributionChart";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    CartesianGrid,
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

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [history, setHistory] = useState<History[]>([]);
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

            {/* Progress Over Time */}
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
                        <Line
                            type="monotone"
                            dataKey="totalSolved"
                            stroke="#2563eb"
                            strokeWidth={2}
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

            <ProblemDistributionChart
                easy={stats.easySolved}
                medium={stats.mediumSolved}
                hard={stats.hardSolved}
            />
        </div>
    );
}
