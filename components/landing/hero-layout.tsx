"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import heroImage from "@/public/assets/hero-background.png";
import Image from "next/image";
import { ButtonExample } from "../examples/button";
import { WindowExample } from "../examples/window";
import { ComponentWrapper } from "../component-wrapper";

export const HeroLayout = ({ children }: { children: React.ReactNode }) => {
  const isTablet = useMediaQuery("(min-width: 640px)");
  const canRotate = useMediaQuery("(orientation: portrait)");
  if (!isTablet)
    return (
      <div>
        <Image src={heroImage} alt="hero" />
        {canRotate ? (
          <p className="text-sm text-muted-foreground">
            Try rotating your device to landscape
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Use a larger screen to interact
          </p>
        )}
        <div className="flex flex-col gap-4 p-6">
          <ComponentWrapper className="flex flex-col gap-4" gradient>
            <ButtonExample />
          </ComponentWrapper>
          <ComponentWrapper gradient>
            <div className="flex w-full flex-wrap justify-center gap-4">
              <WindowExample />
            </div>
          </ComponentWrapper>
        </div>
      </div>
    );
  return <div>{children}</div>;
};
