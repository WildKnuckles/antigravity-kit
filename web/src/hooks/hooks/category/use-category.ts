"use client";
import { useState } from "react";
import { useFetch } from "../common/use-fetch";
import { SucessMessage } from "@/utils/messages";
import { CategoryData, CategoryResponse } from "@/types/category";
import { categoryService } from "@/services/category-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currentStoreStore } from "@/stores";

export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryData) => categoryService.addCategory(data),
    onSuccess: () => {
      SucessMessage("Categoria adicionada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryData }) =>
      categoryService.updateCategory(id, data),
    onSuccess: () => {
      SucessMessage("Categoria atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      SucessMessage("Categoria removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useToggleStatusCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryService.toggleStatusCategory(id),
    onSuccess: () => {
      SucessMessage("Status da categoria alterado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useGetCategories() {
  const [page, setPage] = useState(1);
  const { currentStore } = currentStoreStore();
  const { data, error, isLoading, refetch } = useFetch<CategoryResponse>(
    "categories",
    `/categories?page=${page}&limit=10&storeId=${currentStore?.id}`
  );

  const categories =
    data?.data.map((category) => ({
      label: `${category.name}`,
      value: category.id,
    })) || [];

  const itemsCount = data?.data[0].itemsCount || 0;

  return {
    categoryOptions: categories,
    categories: data?.data || [],
    error,
    isLoading,
    refetch,
    pagination: {
      page: data?.page || 1,
      totalPages: data?.totalPages || 1,
      total: data?.total || 0,
    },
    page,
    setPage,
  };
}
