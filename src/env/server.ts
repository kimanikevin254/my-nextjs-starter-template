import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

expand(config());

export const env = createEnv({
    server: {
        // Define server env variables here
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        NEXTAUTH_SECRET: z.string(),
        DATABASE_URL: z.string(),
    },
    // eslint-disable-next-line n/no-process-env
    experimental__runtimeEnv: process.env,
    emptyStringAsUndefined: true,
    // Called when the schema validation fails.
    onValidationError: (error: ZodError) => {
        console.error(
            "❌ Invalid environment variables:",
            error.flatten().fieldErrors
        );
        process.exit(1);
    },
    // Called when server variables are accessed on the client.
    onInvalidAccess: () => {
        console.error(
            "❌ Attempted to access a server-side environment variable on the client"
        );
        process.exit(1);
    },
});
