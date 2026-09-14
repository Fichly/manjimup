"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { partnerForm } from "@/data/content";
import { establishmentTypes } from "@/data/partnerOffers";
import { site } from "@/data/site";
import { emptyLead, validatePartnerLead, type PartnerLead, type PartnerLeadErrors } from "@/lib/validation";
import { events, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function PartnerForm() {
  const [lead, setLead] = useState<PartnerLead>(emptyLead);
  const [errors, setErrors] = useState<PartnerLeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof PartnerLead) => (value: string) => {
    setLead((l) => ({ ...l, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onFocusStart = () => {
    if (!started.current) {
      started.current = true;
      track(events.partnerFormStart);
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validatePartnerLead(lead);
    setErrors(nextErrors);
    const firstKey = (Object.keys(nextErrors) as (keyof PartnerLead)[]).find((k) => nextErrors[k]);
    if (firstKey) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }
    const honeypot = (formRef.current?.elements.namedItem("company_website") as HTMLInputElement | null)?.value ?? "";
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, company_website: honeypot, ts: startedAt }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: PartnerLeadErrors; error?: string };
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      if (!res.ok || !data.ok) throw new Error(data.error ?? partnerForm.error);
      setStatus("success");
      track(events.partnerFormSubmit, { type: lead.establishmentType, water: lead.waterAccess });
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : partnerForm.error);
    }
  }

  return (
    <Section id="contact-partenaire" tone="white">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={partnerForm.eyebrow} title={partnerForm.title} subtitle={partnerForm.subtitle} />
          <Reveal delay={120} className="mt-8 text-sm text-ink-soft">
            <p>
              Vous préférez nous écrire directement ?{" "}
              <a href={`mailto:${site.contact.email}`} className="font-semibold text-ocean underline-offset-4 hover:underline">
                {site.contact.email}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-7">
          {status === "success" ? (
            <div role="status" className="rounded-3xl bg-cream p-8 sm:p-10">
              <CheckCircle2 className="h-10 w-10 text-turquoise" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-extrabold text-night">{partnerForm.success.title}</h3>
              <p className="mt-2 text-lg text-ink-soft">{partnerForm.success.text}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" onFocusCapture={onFocusStart}>
              <Field id="pf-firstName" label="Prénom" required error={errors.firstName}>
                <Input id="pf-firstName" name="firstName" autoComplete="given-name" value={lead.firstName} onChange={(e) => set("firstName")(e.target.value)} aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "pf-firstName-error" : undefined} />
              </Field>
              <Field id="pf-lastName" label="Nom" required error={errors.lastName}>
                <Input id="pf-lastName" name="lastName" autoComplete="family-name" value={lead.lastName} onChange={(e) => set("lastName")(e.target.value)} aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "pf-lastName-error" : undefined} />
              </Field>
              <Field id="pf-company" label="Entreprise / établissement" required error={errors.company} className="sm:col-span-2">
                <Input id="pf-company" name="company" autoComplete="organization" value={lead.company} onChange={(e) => set("company")(e.target.value)} aria-invalid={!!errors.company} aria-describedby={errors.company ? "pf-company-error" : undefined} />
              </Field>
              <Field id="pf-establishmentType" label="Type d'établissement" required error={errors.establishmentType}>
                <Select id="pf-establishmentType" name="establishmentType" value={lead.establishmentType} onChange={(e) => set("establishmentType")(e.target.value)} aria-invalid={!!errors.establishmentType} aria-describedby={errors.establishmentType ? "pf-establishmentType-error" : undefined}>
                  <option value="">Choisir…</option>
                  {establishmentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field id="pf-city" label="Ville" required error={errors.city}>
                <Input id="pf-city" name="city" autoComplete="address-level2" value={lead.city} onChange={(e) => set("city")(e.target.value)} aria-invalid={!!errors.city} aria-describedby={errors.city ? "pf-city-error" : undefined} />
              </Field>
              <Field id="pf-email" label="Email" required error={errors.email}>
                <Input id="pf-email" name="email" type="email" inputMode="email" autoComplete="email" value={lead.email} onChange={(e) => set("email")(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "pf-email-error" : undefined} />
              </Field>
              <Field id="pf-phone" label="Téléphone" required error={errors.phone}>
                <Input id="pf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={lead.phone} onChange={(e) => set("phone")(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "pf-phone-error" : undefined} />
              </Field>
              <Field id="pf-website" label="Site internet" error={errors.website} className="sm:col-span-2">
                <Input id="pf-website" name="website" type="text" inputMode="url" autoComplete="url" placeholder="www.votre-etablissement.fr" value={lead.website} onChange={(e) => set("website")(e.target.value)} aria-invalid={!!errors.website} aria-describedby={errors.website ? "pf-website-error" : undefined} />
              </Field>

              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold text-ink">
                  Disposez-vous d&rsquo;un accès à l&rsquo;eau ?<span className="text-sun" aria-hidden="true"> *</span>
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {partnerForm.waterAccessOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-sun",
                        lead.waterAccess === opt.value ? "border-ocean bg-ocean text-cream" : "border-line bg-white text-ink hover:border-ocean/40",
                      )}
                    >
                      <input
                        type="radio"
                        name="waterAccess"
                        value={opt.value}
                        checked={lead.waterAccess === opt.value}
                        onChange={() => set("waterAccess")(opt.value)}
                        className="sr-only"
                        aria-describedby={errors.waterAccess ? "pf-waterAccess-error" : undefined}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {errors.waterAccess && (
                  <p id="pf-waterAccess-error" role="alert" className="mt-1.5 text-sm text-[#b3401f]">
                    {errors.waterAccess}
                  </p>
                )}
              </fieldset>

              <Field id="pf-message" label="Message" error={errors.message} hint="Emplacement, plan d'eau, fréquentation, saison… tout ce qui nous aide à comprendre votre spot." className="sm:col-span-2">
                <Textarea id="pf-message" name="message" value={lead.message} onChange={(e) => set("message")(e.target.value)} maxLength={2000} aria-invalid={!!errors.message} aria-describedby={errors.message ? "pf-message-error" : "pf-message-hint"} />
              </Field>

              {/* Champ anti-spam invisible pour les humains */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="pf-company-website">Ne pas remplir</label>
                <input id="pf-company-website" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>

              {status === "error" && serverError && (
                <p role="alert" className="flex items-start gap-2 rounded-xl bg-sun-100 p-4 text-sm font-semibold text-[#8a4a14] sm:col-span-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {serverError}
                </p>
              )}

              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"} aria-busy={status === "loading"}>
                  {status === "loading" ? partnerForm.submitting : partnerForm.submit}
                </Button>
                <p className="mt-4 text-xs leading-relaxed text-ink-soft">{partnerForm.consent}</p>
              </div>
            </form>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
