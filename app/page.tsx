import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) redirect("/login");
    else redirect("/dashboard");
    return null;
}
