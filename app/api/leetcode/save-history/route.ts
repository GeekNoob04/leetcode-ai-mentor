// for overtime tracking
import { NEXT_AUTH } from "@/lib/auth";
import { fetchLeetCodeStats } from "@/lib/leetcode";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
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
        });
        if (!user?.leetcodeUsername) {
            return NextResponse.json(
                { error: "No linked username" },
                { status: 400 }
            );
        }
        const username = user.leetcodeUsername;
        const stats = await fetchLeetCodeStats(username);
        const saved = await prisma.statsHistory.create({
            data: {
                userId: user.id,
                totalSolved: stats.totalSolved,
                easySolved: stats.easySolved,
                mediumSolved: stats.mediumSolved,
                hardSolved: stats.hardSolved,
                ranking: stats.ranking,
            },
        });
        return NextResponse.json({ success: true, saved });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
