"use client"
import { Cursor } from "@/components/core/cursor";
// import Link from "next/link";

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
      <main className="flex max-w-none flex-col justify-center text-center [--tile-radius:1.875rem]">
        <Hero />
      </main>
    </>
  );
}
