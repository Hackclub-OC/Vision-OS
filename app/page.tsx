"use client"
import { Cursor } from "@/components/core/cursor";
import Link from "next/link";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Hero = dynamic(
  () => import("../components/landing/hero").then((mod) => mod.Hero),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="rounded-[--tile-radius]">
        <AspectRatio ratio={2610 / 1468} />
      </Skeleton>
    ),
  },
);

export default function HomePage() {
  return (
    <>
      <Cursor />
      <main className="flex max-w-none flex-col justify-center gap-8 pb-24 text-center [--tile-radius:1.875rem]">
        <Hero />

        <p className="text-fd-muted-foreground">
          You can open{" "}
          <Link
            href="/docs"
            className="font-semibold text-fd-foreground underline"
          >
            /docs
          </Link>{" "}
          and see the documentation.
        </p>
        <p className="text-xs opacity-50">
          Created by{" "}
          <Link
            href="https://github.com/Gitstar-OC"
            className="font-semibold text-fd-foreground underline"
          >
            OC
          </Link>
        </p>
      </main>
    </>
  );
}
