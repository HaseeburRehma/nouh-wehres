import type { Metadata } from "next";
import LandingPage from "../components/landing/LandingPage";
import { fussbodenheizung } from "../lib/landing";

export const metadata: Metadata = {
  title: fussbodenheizung.metaTitle,
  description: fussbodenheizung.metaDescription,
};

export default function FussbodenheizungPage() {
  return <LandingPage config={fussbodenheizung} />;
}
