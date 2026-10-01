"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "puepu-form-enviado";

function subscribe() {
  return () => {};
}

function getSnapshot(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

type GraciasGuardProps = {
  children: ReactNode;
};

export default function GraciasGuard({ children }: GraciasGuardProps) {
  const router = useRouter();
  const hasMark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!hasMark) {
      router.replace("/");
    }
  }, [hasMark, router]);

  if (!hasMark) return null;

  return <>{children}</>;
}
