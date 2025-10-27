import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">הדף לא נמצא</h2>
        <p className="text-muted-foreground mb-8">
          הדף שחיפשת לא קיים או שהוסר
        </p>
        <Link href="/dashboard">
          <Button>
            <Home className="ml-2 h-4 w-4" />
            חזרה לדף הבית
          </Button>
        </Link>
      </div>
    </div>
  )
}

