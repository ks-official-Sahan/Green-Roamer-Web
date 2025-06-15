import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client"

export const metadata: Metadata = {
  title: "Green Roamer - Unveiling Natural Beauty Through Travel",
  description:
    "Explore the breathtaking landscapes of Sri Lanka and Europe through hiking and travel adventures. Discover hidden gems, cultural heritage, and pristine nature.",
  keywords: "travel, hiking, Sri Lanka, Europe, nature, adventure, documentary, YouTube channel",
  authors: [{ name: "Green Roamer" }],
  openGraph: {
    title: "Green Roamer - Travel & Adventure",
    description: "Unveiling the Natural Beauty of Europe and Sri Lanka through Hiking and traveling",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Roamer",
    description: "Explore breathtaking landscapes through travel adventures",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'
