"use client";

import dynamic from "next/dynamic";

const CommandBar = dynamic(() => import("@/components/CommandBar"), {
  ssr: false,
});

const RickrollEaster = dynamic(() => import("@/components/RickrollEaster"), {
  ssr: false,
});

/**
 * ClientProviders wraps all client-only, ssr:false components so they can be
 * safely imported from the Server Component root layout.
 */
export default function ClientProviders() {
  return (
    <>
      <CommandBar />
      <RickrollEaster />
    </>
  );
}
