import { User } from "@prisma/client/wasm";

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> 
& 
{ 
    creadtedAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
