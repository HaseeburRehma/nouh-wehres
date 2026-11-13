import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Förder-LP umbenannt – alte Links/Anzeigen weiterleiten
      { source: "/foerdermittel", destination: "/waermepumpe-foerderung", permanent: true },
    ];
  },
};

export default nextConfig;
