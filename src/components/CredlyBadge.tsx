"use client";

import { useEffect, useRef } from "react";

interface CredlyBadgeProps {
  badgeId: string;
  width?: number;
  height?: number;
}

export default function CredlyBadge({
  badgeId,
  width = 150,
  height = 270,
}: CredlyBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the badge div that Credly's script looks for
    const badgeDiv = document.createElement("div");
    badgeDiv.setAttribute("data-iframe-width", String(width));
    badgeDiv.setAttribute("data-iframe-height", String(height));
    badgeDiv.setAttribute("data-share-badge-id", badgeId);
    badgeDiv.setAttribute("data-share-badge-host", "https://www.credly.com");
    containerRef.current.appendChild(badgeDiv);

    // Load the Credly embed script
    const script = document.createElement("script");
    script.src = "https://cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [badgeId, width, height]);

  return <div ref={containerRef} />;
}
