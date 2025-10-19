import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import DashboardClient from "./DashboardClient/page";

export default async function DashboardPage() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session) redirect("/login");

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar user={session.user} />
            <main className="p-6">
                <DashboardClient />
            </main>
        </div>
    );
}
