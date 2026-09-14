import { NextResponse } from "next/server";
import { sanitizeLead, validatePartnerLead } from "@/lib/validation";
import { deliverPartnerLead } from "@/lib/leads";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MIN_FILL_TIME_MS = 2500;

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  if (!rateLimit(`partner:${ip}`, 5).ok) {
    return NextResponse.json({ ok: false, error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Anti-spam 1 : pot de miel (champ invisible rempli par les robots) → on répond OK sans rien envoyer.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  // Anti-spam 2 : formulaire soumis trop vite après affichage.
  const ts = Number(body.ts);
  if (!Number.isFinite(ts) || Date.now() - ts < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: false, error: "Merci de patienter quelques secondes avant d'envoyer." }, { status: 400 });
  }

  const lead = sanitizeLead(body);
  const errors = validatePartnerLead(lead);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const { delivered } = await deliverPartnerLead(lead, {
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: req.headers.get("user-agent") ?? "",
    referer: req.headers.get("referer") ?? "",
  });

  if (!delivered) {
    return NextResponse.json({ ok: false, error: "L'envoi n'a pas abouti. Réessayez ou écrivez-nous par email." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
