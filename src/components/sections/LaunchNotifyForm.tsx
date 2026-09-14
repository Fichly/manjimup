"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { stationsSection } from "@/data/content";
import { EMAIL_RE } from "@/lib/validation";
import { events, track } from "@/lib/analytics";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function LaunchNotifyForm({ source = "stations" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    if (!EMAIL_RE.test(email.trim())) {
      setError("Cet email ne semble pas valide.");
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website: honeypot, ts: startedAt, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Erreur");
      setStatus("success");
      track(events.notifySubmit, { source });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message !== "Erreur" ? err.message : "L'envoi n'a pas fonctionné. Réessaie dans un instant.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-start gap-2 rounded-xl bg-turquoise-100 p-4 text-sm font-semibold text-ocean">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        {stationsSection.empty.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`notify-email-${source}`} className="sr-only">
            Ton adresse email
          </label>
          <Input
            id={`notify-email-${source}`}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder={stationsSection.empty.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? `notify-error-${source}` : undefined}
            required
          />
        </div>
        {/* Champ anti-spam invisible pour les humains */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`notify-website-${source}`}>Site web</label>
          <input id={`notify-website-${source}`} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" size="md" className="min-h-12" disabled={status === "loading"} aria-busy={status === "loading"}>
          {status === "loading" ? "Envoi…" : stationsSection.empty.cta}
          <Send className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      {error && (
        <p id={`notify-error-${source}`} role="alert" className="text-sm text-[#b3401f]">
          {error}
        </p>
      )}
    </form>
  );
}
