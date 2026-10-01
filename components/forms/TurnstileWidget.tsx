"use client";

import { useEffect, useId, useRef } from "react";
import Script from "next/script";

type TurnstileRenderOptions = {
  sitekey: string;
  language?: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  onVerify: (token: string) => void;
  onExpire: () => void;
  resetKey?: number;
};

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export default function TurnstileWidget({
  onVerify,
  onExpire,
  resetKey,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = useId();

  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const container = containerRef.current;
    if (!siteKey || !container) return;

    let widgetId: string | null = null;
    let pollId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    function render(api: TurnstileApi) {
      widgetId = api.render(container as HTMLElement, {
        sitekey: siteKey as string,
        language: "es",
        callback: (token) => onVerifyRef.current(token),
        "expired-callback": () => onExpireRef.current(),
        "error-callback": () => onExpireRef.current(),
      });
    }

    if (window.turnstile) {
      render(window.turnstile);
    } else {
      pollId = setInterval(() => {
        if (window.turnstile) {
          if (pollId) clearInterval(pollId);
          if (!cancelled) render(window.turnstile);
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [resetKey]);

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" />
      <div ref={containerRef} id={containerId} />
    </>
  );
}
