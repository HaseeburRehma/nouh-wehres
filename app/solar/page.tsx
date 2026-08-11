import type { Metadata } from "next";
import LandingPage from "../components/landing/LandingPage";
import { solar } from "../lib/landing";

export const metadata: Metadata = {
  title: solar.metaTitle,
  description: solar.metaDescription,
};

export default function SolarPage() {
  return <LandingPage config={solar} />;
}
