import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                { status: 401 }
            );
        }
        const history = await prisma.statsHistory.findMany({
            where: { userId: session.user.id },
            orderBy: { fetchedAt: "desc" },
            select: {
                fetchedAt: true,
                totalSolved: true,
                easySolved: true,
                mediumSolved: true,
                hardSolved: true,
            },
        });
        return NextResponse.json({ history });
    } catch (e) {
        console.error("Error in /api/leetcode/history:", e);
        return NextResponse.json(
            { error: "Failed to fetch history" },
            { status: 500 }
        );
    }
}
