"use client";

import { ReactNode } from "react";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="scanlines active" />
      {children}
    </>
  );
}
