"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { SettingsItem } from "@/components/profile/settings-item"
import { Button } from "@/components/ui/button"
import { Fingerprint, Lock, Shield, Key } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SecurityPage() {
  const router = useRouter()
  const { logout } = useAuth()
  const [biometricAuth, setBiometricAuth] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  const handleChangePassword = () => {
    router.push("/profile/security/change-password")
  }

  const handleChangePIN = () => {
    router.push("/profile/security/change-pin")
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Security" backHref="/profile" />

      <div className="p-4 space-y-4">
        <SettingsItem
          icon={<Fingerprint className="h-5 w-5 text-[#0a0b25]" />}
          label="Biometric Authentication"
          type="toggle"
          value={biometricAuth}
          onChange={setBiometricAuth}
        />

        <SettingsItem
          icon={<Shield className="h-5 w-5 text-[#0a0b25]" />}
          label="Two-Factor Authentication"
          type="toggle"
          value={twoFactorAuth}
          onChange={setTwoFactorAuth}
        />

        <SettingsItem
          icon={<Lock className="h-5 w-5 text-[#0a0b25]" />}
          label="Change Password"
          type="link"
          onClick={handleChangePassword}
        />

        <SettingsItem
          icon={<Key className="h-5 w-5 text-[#0a0b25]" />}
          label="Change PIN"
          type="link"
          onClick={handleChangePIN}
        />

        <div className="pt-4">
          <Button variant="outline" className="w-full text-red-500 border-red-500" onClick={logout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}

