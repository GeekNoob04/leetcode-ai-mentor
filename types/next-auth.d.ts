import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            leetcodeUsername?: string | null;
        };
    }

    interface User extends DefaultUser {
        id: string;
        leetcodeUsername?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name?: string | null;
        email?: string | null;
        leetcodeUsername?: string | null;
    }
}
