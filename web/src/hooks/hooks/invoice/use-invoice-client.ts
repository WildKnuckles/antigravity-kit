"use client"
import { useCallback, useState } from "react";
import { ClientSelectOption } from "@/types/clients";
import { UseFormSetValue } from "react-hook-form";

export function useClientSelection(setValue: UseFormSetValue<any>) {
  const [selectedClient, setSelectedClient] = useState<ClientSelectOption | null>(null);

  const handleClientChange = useCallback(
    (option: ClientSelectOption | null) => {
      setSelectedClient(option);

      if (!option) {
        setValue("client", { name: "", taxNumber: "", address: "", phone: "" });
        setValue("clientId", "");
        return;
      }

      if (option.__isNew__) {
        setValue("client", {
          name: option.label,
          taxNumber: "",
          address: "",
          phone: "",
        });
        setValue("clientId", "");
      } else if (option.data) {
        setValue("client", {
          name: option.data.name,
          taxNumber: option.data.taxNumber || "",
          address: option.data.address || "",
          phone: option.data.phone || "",
        });
        setValue("clientId", option.data.id);
      }
    },
    [setValue]
  );

  return {
    selectedClient,
    setSelectedClient, // Útil para resetar ou setar valor inicial na edição
    handleClientChange,
  };
}