import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "QuickLanding - בניית דפי נחיתה בעברית",
  description: "פלטפורמה לבניית דפי נחיתה מקצועיים בעברית עם עורך ויזואלי",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <Toaster position="top-center" dir="rtl" />
      </body>
    </html>
  )
}

