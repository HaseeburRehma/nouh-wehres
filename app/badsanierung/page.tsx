import type { Metadata } from "next";
import LandingPage from "../components/landing/LandingPage";
import { badsanierung } from "../lib/landing";

export const metadata: Metadata = {
  title: badsanierung.metaTitle,
  description: badsanierung.metaDescription,
};

export default function BadsanierungPage() {
  return <LandingPage config={badsanierung} />;
}
