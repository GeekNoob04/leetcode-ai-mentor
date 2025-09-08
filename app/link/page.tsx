"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LinkPage() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
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
            setError("Failed to link username");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="bg-white shadow-md rounded-xl p-6 w-96">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Link Your LeetCode Username
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your LeetCode username"
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        {loading ? "Linking..." : "Link Username"}
                    </button>
                </form>
            </div>
        </div>
    );
}
