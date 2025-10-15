import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const history = await prisma.statsHistory.findMany({
        where: { userId: session.user.id },
        orderBy: { fetchedAt: "asc" },
    });
    if (history.length < 2) {
        return NextResponse.json({
            message: "Not enough history yet",
        });
    }
    const first = history[0];
    const latest = history[history.length - 1];
    const diff = {
        totalDiff: latest.totalSolved - first.totalSolved,
        easyDiff: latest.easySolved - first.easySolved,
        mediumDIff: latest.mediumSolved - first.mediumSolved,
        hardDiff: latest.hardSolved - first.hardSolved,
    };
    const insights: string[] = [];

    if (diff.totalDiff > 0)
        insights.push(
            `You solved ${diff.totalDiff} more problems since you linked your account.`
        );
    if (diff.mediumDIff === 0 && diff.easyDiff > 0)
        insights.push("Try focusing on medium-level problems to level up.");
    if (diff.hardDiff > 0)
        insights.push("Nice! You're improving with hard problems too.");
    if (
        latest.ranking !== null &&
        first.ranking !== null &&
        latest.ranking < first.ranking
    ) {
        insights.push("Your ranking has improved — great progress!");
    }
    return NextResponse.json({ insights });
}
