/**
 * Validation partagée client/serveur du formulaire partenaire (sans dépendance).
 */
import { establishmentTypes } from "@/data/partnerOffers";

export type WaterAccess = "yes" | "no" | "nearby";

export type PartnerLead = {
  firstName: string;
  lastName: string;
  company: string;
  establishmentType: string;
  city: string;
  email: string;
  phone: string;
  website: string;
  waterAccess: WaterAccess | "";
  message: string;
};

export type PartnerLeadErrors = Partial<Record<keyof PartnerLead, string>>;

export const emptyLead: PartnerLead = {
  firstName: "",
  lastName: "",
  company: "",
  establishmentType: "",
  city: "",
  email: "",
  phone: "",
  website: "",
  waterAccess: "",
  message: "",
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,19}$/;
// Caractères de contrôle ASCII (0x00–0x1F, 0x7F), construits sans littéraux bruts.
const CONTROL_CHARS = new RegExp("[\\x00-\\x1f\\x7f]", "g");

export function normalizeWebsite(value: string) {
  const v = value.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export function validatePartnerLead(lead: PartnerLead): PartnerLeadErrors {
  const errors: PartnerLeadErrors = {};
  const req = (key: keyof PartnerLead, label: string) => {
    if (!String(lead[key] ?? "").trim()) errors[key] = `${label} est requis.`;
  };

  req("firstName", "Le prénom");
  req("lastName", "Le nom");
  req("company", "Le nom de l'établissement");
  req("city", "La ville");
  req("email", "L'email");
  req("phone", "Le téléphone");

  if (!lead.establishmentType) {
    errors.establishmentType = "Choisissez un type d'établissement.";
  } else if (!(establishmentTypes as readonly string[]).includes(lead.establishmentType)) {
    errors.establishmentType = "Type d'établissement invalide.";
  }

  if (lead.email && !EMAIL_RE.test(lead.email.trim())) errors.email = "Cet email ne semble pas valide.";
  if (lead.phone && !PHONE_RE.test(lead.phone.trim())) errors.phone = "Ce numéro ne semble pas valide.";

  if (lead.website.trim()) {
    try {
      new URL(normalizeWebsite(lead.website));
    } catch {
      errors.website = "Cette adresse de site ne semble pas valide.";
    }
  }

  if (!["yes", "no", "nearby"].includes(lead.waterAccess)) {
    errors.waterAccess = "Indiquez si vous disposez d'un accès à l'eau.";
  }

  if (lead.message.length > 2000) errors.message = "Le message est trop long (2000 caractères max).";

  return errors;
}

export function sanitizeLead(input: unknown): PartnerLead {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: keyof PartnerLead, max = 200) =>
    String(src[k] ?? "")
      .replace(CONTROL_CHARS, " ")
      .trim()
      .slice(0, max);
  return {
    firstName: str("firstName", 80),
    lastName: str("lastName", 80),
    company: str("company", 120),
    establishmentType: str("establishmentType", 60),
    city: str("city", 80),
    email: str("email", 160).toLowerCase(),
    phone: str("phone", 30),
    website: str("website", 200),
    waterAccess: str("waterAccess", 10) as PartnerLead["waterAccess"],
    message: str("message", 2000),
  };
}
