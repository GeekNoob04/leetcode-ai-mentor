"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar({ user }: { user: any }) {
    return (
        <nav className="w-full bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
            <Link href="/dashboard" className="text-lg font-semibold">
                CodeMentor AI
            </Link>

            <div className="flex items-center gap-4">
                <span className="text-sm">{user?.name}</span>
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
