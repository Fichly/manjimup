/**
 * Acheminement des leads (formulaire partenaire + inscriptions au lancement).
 *
 * Aucun SDK : de simples appels fetch, activés par variables d'environnement.
 * Sans configuration, les leads sont journalisés côté serveur (utile en dev).
 *
 *   RESEND_API_KEY + LEADS_TO_EMAIL (+ LEADS_FROM_EMAIL)  → email via Resend
 *   BREVO_API_KEY (+ BREVO_LIST_ID)                       → contact Brevo
 *   LEAD_WEBHOOK_URL                                      → POST JSON (HubSpot, Supabase, Make, n8n…)
 */
import type { PartnerLead } from "./validation";
import { site } from "@/data/site";

type Delivery = { name: string; ok: boolean; error?: string };

async function sendViaResend(subject: string, html: string, replyTo?: string): Promise<Delivery | null> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  if (!key || !to) return null;
  const from = process.env.LEADS_FROM_EMAIL ?? "MANJIM'UP <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), subject, html, reply_to: replyTo }),
    });
    return { name: "resend", ok: res.ok, error: res.ok ? undefined : `${res.status}` };
  } catch (e) {
    return { name: "resend", ok: false, error: String(e) };
  }
}

async function sendViaBrevo(email: string, attributes: Record<string, string>): Promise<Delivery | null> {
  const key = process.env.BREVO_API_KEY;
  if (!key) return null;
  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ email, attributes, listIds: listId ? [listId] : undefined, updateEnabled: true }),
    });
    const ok = res.ok || res.status === 204;
    return { name: "brevo", ok, error: ok ? undefined : `${res.status}` };
  } catch (e) {
    return { name: "brevo", ok: false, error: String(e) };
  }
}

async function sendViaWebhook(payload: unknown): Promise<Delivery | null> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { name: "webhook", ok: res.ok, error: res.ok ? undefined : `${res.status}` };
  } catch (e) {
    return { name: "webhook", ok: false, error: String(e) };
  }
}

function escapeHtml(s: string) {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return s.replace(/[&<>"']/g, (c) => map[c]);
}

function leadToHtml(lead: PartnerLead, meta: Record<string, string>) {
  const rows = Object.entries({ ...lead, ...meta })
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(String(v ?? ""))}</td></tr>`,
    )
    .join("");
  return `<h2 style="font-family:sans-serif">Nouveau lead partenaire MANJIM'UP</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`;
}

function summarize(kind: string, payload: unknown, results: Delivery[]) {
  if (results.length === 0) {
    console.info(`[lead:${kind}] (aucun canal configuré)`, JSON.stringify(payload));
    return { delivered: true, results };
  }
  const delivered = results.some((r) => r.ok);
  if (!delivered) console.error(`[lead:${kind}] échec de livraison`, results);
  return { delivered, results };
}

/** `delivered` = au moins un canal configuré a réussi (ou aucun canal configuré → log). */
export async function deliverPartnerLead(lead: PartnerLead, meta: Record<string, string>) {
  const payload = { type: "partner_lead", lead, meta, site: site.url };
  const results = (
    await Promise.all([
      sendViaResend(`[Lead partenaire] ${lead.company} — ${lead.city}`, leadToHtml(lead, meta), lead.email),
      sendViaBrevo(lead.email, {
        PRENOM: lead.firstName,
        NOM: lead.lastName,
        SOCIETE: lead.company,
        VILLE: lead.city,
        TYPE: lead.establishmentType,
        SOURCE: "site-partenaire",
      }),
      sendViaWebhook(payload),
    ])
  ).filter((r): r is Delivery => r !== null);
  return summarize("partner", payload, results);
}

export async function deliverLaunchSubscriber(email: string, meta: Record<string, string>) {
  const payload = { type: "launch_subscriber", email, meta, site: site.url };
  const results = (
    await Promise.all([
      sendViaResend(
        `[Lancement] Nouvel inscrit : ${email}`,
        `<p style="font-family:sans-serif">${escapeHtml(email)} souhaite être informé du lancement.</p>`,
      ),
      sendViaBrevo(email, { SOURCE: "site-lancement" }),
      sendViaWebhook(payload),
    ])
  ).filter((r): r is Delivery => r !== null);
  return summarize("launch", payload, results);
}
