import { User } from "@prisma/client/wasm";

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> 
& 
{ 
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
