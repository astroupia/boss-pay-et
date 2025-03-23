import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0a0b25] flex flex-col items-center justify-center p-6">
      <div className="relative w-32 h-32 mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01%20Welcome.jpg-uuGJBjFoMu1vP17YKCvoDSJ1ma327t.jpeg"
          alt="Apitex Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <Link href="/onboarding" className="w-full max-w-xs">
        <Button className="w-full bg-[#f8d0bc] text-[#0a0b25] hover:bg-[#f8c0ac]">Continue</Button>
      </Link>
    </div>
  )
}

