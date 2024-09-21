import { createEnv } from "@t3-oss/env-nextjs";
import { ZodError } from "zod";

export const env = createEnv({
    server: {
        // Define server env variables here
        // DATABASE_URL: z.string().url()
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
