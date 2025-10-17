import { NEXT_AUTH } from "@/lib/auth";
import { fetchLeetCodeTopicStats } from "@/lib/leetcode";
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
        const topicStats = await fetchLeetCodeTopicStats(username);
        if (!topicStats.length) {
            return NextResponse.json(
                { error: "No topic stats found" },
                { status: 404 }
            );
        }
        await prisma.topicStats.create({
            data: {
                userId: user.id,
                topics: topicStats,
                fetchedAt: new Date(),
            },
        });
        return NextResponse.json({ success: true, topics: topicStats });
    } catch (e) {
        console.error("Error fetching topic stats:", e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
