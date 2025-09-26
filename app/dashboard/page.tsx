"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Stats {
    username: string;
    totalSolved: number;
    totalQuestions: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    contestRating?: number;
    contributionPoints?: number;
    reputation?: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await axios.get("/api/leetcode/stats");
                console.log("API response:", res.data);
                setStats(res.data.stats);
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
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Leetcode Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow p-6">
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
                    <p className="text-3xl font-bold">#{stats.ranking}</p>
                </div>
                <div className="bg-purple-100 rounded-xl shadow p-6">
                    <p className="text-gray-700">Contest Rating</p>
                    <p className="text-2xl font-bold">
                        {stats.contestRating ?? "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}
