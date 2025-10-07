import { NEXT_AUTH } from "@/lib/auth";
import { fetchLeetCodeContestStats } from "@/lib/leetcode";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session?.user?.id) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
            });
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
        const stats = await fetchLeetCodeContestStats(username);
        return NextResponse.json(stats);
    } catch (e) {
        console.error("Error fetching contest stats:", e);
        return NextResponse.json(
            { error: "Failed to fetch contest stats" },
            { status: 500 }
        );
    }
}
