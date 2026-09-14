import React from "react";
import type { Metadata } from "next";
import { DownloadClient } from "./download-client";

export const metadata: Metadata = {
  title: "Install Watech Mobile App | Android & iPhone (iOS) | Official WATECH",
  description:
    "Official Watech Solutions Mobile App for Android and iPhone. Instant 1-tap installation, 0 MB storage, real-time live property and furniture sync, or direct 3.35 MB Android APK download.",
};

export default function DownloadAppPage() {
  return <DownloadClient />;
}

