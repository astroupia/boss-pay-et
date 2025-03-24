"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  ];

  const handleSave = () => {
    // In a real app, this would save the language preference
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Language" />

      <div className="p-4">
        <div className="space-y-2 mb-6">
          {languages.map((language) => (
            <button
              key={language.code}
              className="flex items-center justify-between w-full p-4 bg-[#fff5f1] rounded-xl"
              onClick={() => setSelectedLanguage(language.code)}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{language.flag}</div>
                <div>
                  <div className="font-medium text-left">{language.name}</div>
                  <div className="text-sm text-gray-500">
                    {language.nativeName}
                  </div>
                </div>
              </div>
              {selectedLanguage === language.code && (
                <div className="h-6 w-6 rounded-full bg-[#4da9e4] flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <Button onClick={handleSave} className="w-full bg-[#0a0b25]">
          Save
        </Button>
      </div>
    </div>
  );
}
