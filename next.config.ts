// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production'da browser source map'lerini yayınlama.
  productionBrowserSourceMaps: false,

  // Gereksiz framework bilgisini response header'dan kaldır.
  poweredByHeader: false,
};

export default nextConfig;
