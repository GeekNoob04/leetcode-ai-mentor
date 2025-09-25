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
        <div className="p-4">
            <h1 className="text-2xl font-bold">Leetcode Dashboard</h1>
            <pre className="bg-gray-900 text-white p-4 rounded-xl mt-4 overflow-x-auto">
                {JSON.stringify(stats, null, 2)}
            </pre>
        </div>
    );
}
