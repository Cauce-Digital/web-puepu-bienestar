"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
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
  // Recuerda que la visita ya se validó, para poder borrar la marca sin que
  // el siguiente render la lea como ausente y redirija.
  const [confirmado, setConfirmado] = useState(false);

  if (hasMark && !confirmado) {
    setConfirmado(true);
  }

  useEffect(() => {
    if (confirmado) {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // sessionStorage puede no estar disponible; no afecta la página.
      }
      return;
    }
    if (!hasMark) {
      router.replace("/");
    }
  }, [confirmado, hasMark, router]);

  if (!hasMark && !confirmado) return null;

  return <>{children}</>;
}
