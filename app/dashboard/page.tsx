"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Stats {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contestRating: number;
    ranking: number;
}
export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/api/leetcode/stats");
                if (res.data.success) {
                    setStats(res.data.stats);
                } else {
                    setError(res.data.error || "Failed to fetch stats");
                }
            } catch (err) {
                console.log(err);
                setError("An error occurred while fetching stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    if (loading) {
        return (
            <p className="text-center mt-10">Loading Your LeetCode Stats....</p>
        );
    }
    if (error) {
        return <p className="text-center mt-10 text-red-500"> {error}</p>;
    }
    return (
        <div>
            <h1>📊 Your LeetCode Dashboard</h1>
            {stats && (
                <div>
                    <div>
                        <p>Username</p>
                        <p>{stats.username}</p>
                    </div>
                    <div>
                        <p>Total Solved</p>
                        <p>{stats.totalSolved}</p>
                    </div>
                    <div>
                        <p>Easy Solved</p>
                        <p>{stats.easySolved}</p>
                    </div>
                    <div>
                        <p>Medium Solved</p>
                        <p>{stats.mediumSolved}</p>
                    </div>
                    <div>
                        <p>Hard Solved</p>
                        <p>{stats.hardSolved}</p>
                    </div>
                    <div>
                        <p>Contest Rating</p>
                        <p>{stats.contestRating}</p>
                    </div>
                    <div>
                        <p>Global Ranking</p>
                        <p>#{stats.ranking}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
