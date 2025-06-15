"use client"
import { NewsletterConfig } from "@/components/newsletter/newsletter-config"

export default function NewsletterAdminPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Newsletter Modal Management</h1>
        <p className="text-muted-foreground mt-2">Configure and monitor the newsletter subscription modal behavior</p>
      </div>

      <NewsletterConfig />
    </div>
  )
}
