import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user?.id) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }
    try {
        const { leetcodeUsername } = await req.json();
        if (!leetcodeUsername || typeof leetcodeUsername !== "string") {
            return new NextResponse(
                JSON.stringify({ error: "Invalid username" }),
                {
                    status: 400,
                }
            );
        }
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { leetcodeUsername },
        });
        return new NextResponse(
            JSON.stringify({ success: true, user: updatedUser }),
            {
                status: 200,
            }
        );
    } catch (e) {
        console.error("Error linking username:", e);
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
            }
        );
    }
}
