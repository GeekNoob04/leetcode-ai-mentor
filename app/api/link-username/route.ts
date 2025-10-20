import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { leetcodeUsername } = await req.json();
        if (!leetcodeUsername || typeof leetcodeUsername !== "string") {
            return NextResponse.json(
                { error: "Invalid username" },
                { status: 400 }
            );
        }

        // Clear old cached stats before linking a new account
        await prisma.leetcodeStats.deleteMany({
            where: { userId: session.user.id },
        });

        // Update user with new username
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { leetcodeUsername },
        });

        return NextResponse.json(
            { success: true, user: updatedUser },
            { status: 200 }
        );
    } catch (e) {
        console.error("Error linking username:", e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
