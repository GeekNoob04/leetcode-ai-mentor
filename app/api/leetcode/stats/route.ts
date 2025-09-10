import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { leetcodeUsername: true },
        });
        if (!user?.leetcodeUsername) {
            return NextResponse.json(
                {
                    error: "No linked username",
                },
                { status: 400 }
            );
        }
        const { data } = await axios.get(
            `https://alfa-leetcode-api.onrender.com/${user.leetcodeUsername}`
        );
        return NextResponse.json({ success: true, stats: data, status: 200 });
    } catch (err) {
        console.error("Error fetching stats:", err);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
