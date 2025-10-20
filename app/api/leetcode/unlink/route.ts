import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        await prisma.user.update({
            where: { email: session.user.email },
            data: { leetcodeUsername: null },
        });
        return NextResponse.json({
            success: true,
            message: "Unlinked successfully",
        });
    } catch (e) {
        console.error("Error unlinking username:", e);
        return NextResponse.json(
            { error: "Failed to Unlink" },
            { status: 500 }
        );
    }
}
