"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
    const { status, data } = useSession();

    console.log(data);

    if (status === "loading") {
        return (
            <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
            {status === "unauthenticated" ?
                <button
                    className="rounded bg-blue-500 px-8 py-2 text-white"
                    onClick={() => signIn("google")}
                >
                    Sign In
                </button>
            :   <div className="flex w-96 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow">
                    {/* eslint-disable-next-line */}
                    <img
                        className="mb-3 h-24 w-24 rounded-full shadow-lg"
                        // eslint-disable-next-line
                        src={data?.user?.image!}
                        alt={`${data?.user?.name?.split(" ")[0]}` + "'s image"}
                    />
                    <h5 className="mb-1 text-xl font-medium">
                        {data?.user?.name}
                    </h5>
                    <span className="text-sm text-gray-700">
                        {data?.user?.email}
                    </span>

                    <button
                        className="mt-4 rounded bg-red-500 px-8 py-2 text-white"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            }
        </div>
    );
}
