import { NEXT_AUTH } from "@/lib/auth";
import { fetchLeetCodeStats } from "@/lib/leetcode";
import prisma from "@/lib/prisma";
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
        });
        if (!user?.leetcodeUsername) {
            return NextResponse.json(
                {
                    error: "No linked username",
                },
                { status: 400 }
            );
        }
        const cached = await prisma.leetcodeStats.findUnique({
            where: { userId: user.id },
        });
        // 30 min ke andar cache hue ya nhi, if yes then return
        const THIRTY_MINUTES = 30 * 60 * 1000;
        if (
            cached &&
            Date.now() - cached.updatedAt.getTime() < THIRTY_MINUTES
        ) {
            return NextResponse.json({ cached: true, stats: cached.statsJson });
        }
        // if no then fetch
        const fetchStats = await fetchLeetCodeStats(user.leetcodeUsername);
        // if new - db mai add, if exist - update karo
        await prisma.leetcodeStats.upsert({
            where: { userId: user.id },
            update: { statsJson: fetchStats },
            create: { userId: user.id, statsJson: fetchStats },
        });
        return NextResponse.json({ cached: false, stats: fetchStats });
    } catch (err) {
        console.error("Error fetching stats:", err);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
