import type { Metadata } from "next";
import LandingPage from "../components/landing/LandingPage";
import { waermepumpe } from "../lib/landing";

export const metadata: Metadata = {
  title: waermepumpe.metaTitle,
  description: waermepumpe.metaDescription,
};

export default function WaermepumpePage() {
  return <LandingPage config={waermepumpe} />;
}
