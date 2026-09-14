import type { Metadata } from "next";
import { legal } from "@/data/legal";
import { LegalPage } from "@/components/LegalPage";

const doc = legal.documents.cgv;

export const metadata: Metadata = {
  title: doc.title,
  robots: legal.published ? { index: true, follow: true } : { index: false, follow: true },
  alternates: { canonical: "/cgv" },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
