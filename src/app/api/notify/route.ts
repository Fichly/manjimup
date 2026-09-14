import { NextResponse } from "next/server";
import { EMAIL_RE } from "@/lib/validation";
import { deliverLaunchSubscriber } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`notify:${ip}`, 5).ok) {
    return NextResponse.json({ ok: false, error: "Trop de tentatives. Réessaie dans quelques minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  const ts = Number(body.ts);
  if (!Number.isFinite(ts) || Date.now() - ts < 1500) {
    return NextResponse.json({ ok: false, error: "Merci de patienter une seconde avant d'envoyer." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 160);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Cet email ne semble pas valide." }, { status: 422 });
  }

  const { delivered } = await deliverLaunchSubscriber(email, {
    receivedAt: new Date().toISOString(),
    ip,
    source: String(body.source ?? "").slice(0, 40),
    userAgent: req.headers.get("user-agent") ?? "",
  });

  if (!delivered) {
    return NextResponse.json({ ok: false, error: "L'envoi n'a pas abouti. Réessaie dans un instant." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
