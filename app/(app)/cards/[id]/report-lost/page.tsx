"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { formatCurrency, maskCardNumber } from "@/lib/utils";
import type { CardDetails } from "@/types";

// Mock data for a specific card
const getCardById = (id: string): CardDetails => {
  const cards: { [key: string]: CardDetails } = {
    "1": {
      id: "1",
      type: "visa",
      number: "4358123412344253",
      currency: "USD",
      expiry: "12/24",
      balance: 4863.27,
      color: "peach",
      isDefault: true,
    },
  };

  return cards[id] || cards["1"]; // Default to first card if not found
};

export default function ReportLostCardPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const card = getCardById(params.id);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/cards");
    } catch (error) {
      console.error("Error reporting lost card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f1]">
      <PageHeader title="Report Lost Card" />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-[#f8d0bc] flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-[#0a0b25]" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="mb-2">
            <div className="text-sm text-gray-600">Card Number</div>
            <div className="font-medium">{maskCardNumber(card.number)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Current Balance</div>
            <div className="font-medium">
              {formatCurrency(card.balance, card.currency)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4">
          <div className="text-sm text-gray-600 mb-2">
            Additional Details (Optional)
          </div>
          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Please provide any details about when and where you lost your card..."
            className="border-0 resize-none focus-visible:ring-0"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "Report Card as Lost"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
