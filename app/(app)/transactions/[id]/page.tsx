"use client";

import { useRouter } from "next/navigation";
import { CurvedHeader } from "@/components/profile/curved-header";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Download, RefreshCw, ArrowLeft } from "lucide-react";
import type { TransactionDetails } from "@/types/transaction";
import { PageTransition } from "@/components/ui/page-transition";

// Mock data - in a real app, this would come from an API or context
const mockTransactions: { [key: string]: TransactionDetails } = {
  "1": {
    id: "1",
    amount: -263.57,
    currency: "USD",
    date: "Apr 10, 2023",
    time: "11:34 AM",
    recipient: "Hillary Holmes",
    cardNumber: "**** 4253",
    fee: 1.8,
    residualBalance: 4863.27,
    type: "outgoing",
    category: "Money transfer",
    status: "completed",
    name: "Hillary Holmes",
  },
};

export default function TransactionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const transaction = mockTransactions[params.id];

  if (!transaction) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Transaction not found
        </p>
      </div>
    );
  }

  const handleRepeatTransfer = () => {
    router.push(`/transfers/new?recipient=${transaction.recipient}`);
  };

  const handleDownloadPdf = () => {
    // In a real app, this would download a PDF
    console.log("Downloading PDF...");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="bg-[#0a0b25] dark:bg-gray-900 p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-white mr-2 hover:bg-white/10 transition-colors"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white text-lg font-medium">
            Transaction Details
          </h1>
        </div>

        <CurvedHeader className="flex flex-col items-center pt-6 pb-12">
          <div className="text-4xl font-bold text-white mb-2">
            {formatCurrency(transaction.amount, transaction.currency)}
          </div>
          <p className="text-gray-300">
            {transaction.date} at {transaction.time}
          </p>
          <div className="mt-4 bg-green-500 rounded-full p-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </CurvedHeader>

        <div className="p-4 -mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm space-y-4 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Sent to</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {transaction.recipient}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Card</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {transaction.cardNumber}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Amount</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(
                  Math.abs(transaction.amount),
                  transaction.currency
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Fee</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(transaction.fee, transaction.currency)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Residual balance
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(
                  transaction.residualBalance,
                  transaction.currency
                )}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-gray-200 dark:border-gray-700"
              onClick={handleRepeatTransfer}
            >
              <RefreshCw className="h-4 w-4" />
              Repeat Transfer
            </Button>
            <Button
              className="w-full bg-[#0a0b25] hover:bg-[#1a1b35] dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center gap-2"
              onClick={handleDownloadPdf}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
