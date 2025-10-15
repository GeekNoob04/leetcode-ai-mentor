import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
            select: { leetcodeUsername: true },
        });
        const history = await prisma.statsHistory.findMany({
            where: { userId: session.user.id },
            orderBy: { fetchedAt: "asc" },
        });
        if (!history.length) {
            return NextResponse.json(
                { message: "No LeetCode data found" },
                { status: 400 }
            );
        }
        const latest = history.at(-1); // latest entry
        const first = history[0]; // first entry
        const summary = {
            username: user?.leetcodeUsername,
            totalSolved: latest?.totalSolved,
            growth: (latest?.totalSolved ?? 0) - (first?.totalSolved ?? 0),
            easy: latest?.easySolved,
            medium: latest?.mediumSolved,
            hard: latest?.hardSolved,
            ranking: latest?.ranking,
            totalEntries: history.length,
        };
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `
        You are an AI coding mentor analyzing a user's LeetCode performance.
        Here is the user's LeetCode progress summary:
        ${JSON.stringify(summary, null, 2)}
        Your task:
        - Evaluate their progress
        - Identify strengths and weaknesses (by problem difficulty)
        - Give motivational and improvement-oriented feedback
        - Be specific, friendly, and concise (max 150 words)
        `;
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return NextResponse.json({ aiFeedback: response });
    } catch (e) {
        console.error("Error generating AI insights:", e);
        return NextResponse.json(
            { error: "Failed to generate AI insights" },
            { status: 500 }
        );
    }
}
