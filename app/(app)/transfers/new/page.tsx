"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useSearchParams } from "next/navigation";
import { useAccounts } from "@/lib/hooks/use-accounts";
import { useContacts } from "@/lib/hooks/use-contacts";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { PageTransition } from "@/components/ui/page-transition";
import { useRouter } from "next/navigation";
import { TransferForm } from "@/components/transfer/transfer-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Account, Contact } from "@/types";

export default function NewTransferPage() {
  const router = useRouter();
  const {
    accounts,
    getDefaultAccount,
    loading: loadingAccounts,
  } = useAccounts();
  const { contacts, loading: loadingContacts } = useContacts();
  const searchParams = useSearchParams();

  const [fromAccount, setFromAccount] = useState<Account | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Set default account when accounts are loaded
  useEffect(() => {
    if (!loadingAccounts && accounts.length > 0) {
      setFromAccount(getDefaultAccount());
    }
  }, [accounts, getDefaultAccount, loadingAccounts]);

  // Set default contact when contacts are loaded
  useEffect(() => {
    if (!loadingContacts && contacts.length > 0) {
      // Check for contact ID in URL params
      const contactId = searchParams?.get("contact");
      if (contactId) {
        const contact = contacts.find((c) => c.id === contactId);
        if (contact) {
          setSelectedContact({
            id: contact.id,
            name: contact.name,
            email: contact.email || "",
            avatar: contact.avatar,
            initial: contact.name.charAt(0).toUpperCase(),
            accountNumber: contact.accountNumber,
          });
        } else {
          setSelectedContact({
            id: contacts[0].id,
            name: contacts[0].name,
            email: contacts[0].email || "",
            avatar: contacts[0].avatar,
            initial: contacts[0].name.charAt(0).toUpperCase(),
            accountNumber: contacts[0].accountNumber,
          });
        }
      } else {
        setSelectedContact({
          id: contacts[0].id,
          name: contacts[0].name,
          email: contacts[0].email || "",
          avatar: contacts[0].avatar,
          initial: contacts[0].name.charAt(0).toUpperCase(),
          accountNumber: contacts[0].accountNumber,
        });
      }
    }
  }, [contacts, loadingContacts, searchParams]);

  const handleSubmit = async (amount: string, note: string) => {
    try {
      // In a real app, this would call an API to process the transfer
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const encodedRecipient = encodeURIComponent(
        selectedContact?.name || "Recipient"
      );
      router.push(
        `/transfers/confirmation?amount=${amount}&currency=${
          fromAccount?.currency || "USD"
        }&recipient=${encodedRecipient}`
      );
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  const handleChangeContact = () => {
    // In a real app, this would open a contact selector
    alert("Change contact functionality would be implemented here");
  };

  if (loadingAccounts || loadingContacts) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900 pb-20">
        <PageHeader title="Money Transfer" />

        <TransferForm
          fromAccount={fromAccount}
          selectedContact={selectedContact}
          onSubmit={handleSubmit}
          onChangeContact={handleChangeContact}
        />

        <BottomNavigation activeItem="transfers" />
      </div>
    </PageTransition>
  );
}
