"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: any }) {
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
        <nav className="w-full bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
            <Link href="/dashboard" className="text-lg font-semibold">
                CodeMentor AI
            </Link>

            <div className="flex items-center gap-4">
                <span className="text-sm">Welcome {user?.name}</span>
                <button
                    onClick={handleUnlink}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition-all"
                >
                    Unlink
                </button>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
