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
        const stats = {
            username: fetchStats.matchedUser.username,
            totalSolved:
                fetchStats.matchedUser.submitStats.acSubmissionNum[0]?.count ??
                0,
            easySolved:
                fetchStats.matchedUser.submitStats.acSubmissionNum[1]?.count ??
                0,
            mediumSolved:
                fetchStats.matchedUser.submitStats.acSubmissionNum[2]?.count ??
                0,
            hardSolved:
                fetchStats.matchedUser.submitStats.acSubmissionNum[3]?.count ??
                0,
            contestRating: fetchStats.matchedUser.profile.reputation ?? 0,
            ranking: fetchStats.matchedUser.profile.ranking ?? 0,
        };

        // if new - db mai add, if exist - update karo
        await prisma.leetcodeStats.upsert({
            where: { userId: user.id },
            update: { statsJson: stats },
            create: { userId: user.id, statsJson: stats },
        });
        await prisma.statsHistory.create({
            data: {
                userId: user.id,
                totalSolved: stats.totalSolved,
                easySolved: stats.easySolved,
                mediumSolved: stats.mediumSolved,
                hardSolved: stats.hardSolved,
                ranking: stats.ranking,
            },
        });
        // Avoid code duplication in history if no changes
        const lastHistory = await prisma.statsHistory.findFirst({
            where: { userId: user.id },
            orderBy: { fetchedAt: "desc" },
        });

        const alreadyToday =
            lastHistory &&
            new Date(lastHistory.fetchedAt).toDateString() ===
                new Date().toDateString();

        const changed =
            !lastHistory ||
            lastHistory.totalSolved !== stats.totalSolved ||
            lastHistory.easySolved !== stats.easySolved ||
            lastHistory.mediumSolved !== stats.mediumSolved ||
            lastHistory.hardSolved !== stats.hardSolved;

        if (!alreadyToday || changed) {
            await prisma.statsHistory.create({
                data: {
                    userId: user.id,
                    totalSolved: stats.totalSolved,
                    easySolved: stats.easySolved,
                    mediumSolved: stats.mediumSolved,
                    hardSolved: stats.hardSolved,
                    ranking: stats.ranking,
                },
            });
        }
        return NextResponse.json({ cached: false, stats });
    } catch (err) {
        console.error("Error fetching stats:", err);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
