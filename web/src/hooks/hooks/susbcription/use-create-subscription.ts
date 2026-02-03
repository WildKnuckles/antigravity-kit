import { useModal } from "@/stores";
import { subscriptionService } from "@/services";
import { SubscriptionFormData } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateSubscription() {
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubscriptionFormData) => subscriptionService.createSubscription(data),
    onSuccess: () => {
      openModal("subscription-created");
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["current-subscription"] });
    },
    onError: (error: any) => {
      console.error("Erro ao criar assinatura:", error);
      openModal("subscription-error");
    },
  });
}
