import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import {
  create_network,
  find_network_tree,
  update_network,
} from "@/apis/network";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { delete_network_by_id } from "@/server/controllers/network";
import { CreateNetworkInfo, UpdateNetworkInfo } from "@/types/network";

export const useNetworkTreeData = () => {
  const queryClient = useQueryClient();

  const networkTreeData = useQuery({
    queryKey: ["network", "network/tree"],
    queryFn: find_network_tree,
  });

  const useUpdateNetworkTree = (data: UpdateNetworkInfo) =>
    useMutation({
      mutationFn: () => update_network(data),
    });

  const useDeleteNetwork = () =>
    useMutation({
      mutationFn: delete_network_by_id,
    });

  const useCreateNetowrk = <
    TData = unknown,
    TError = Error,
    TVariables = void,
    TContext = unknown
  >(
    options: Omit<
      UseMutationOptions<TData, TError, TVariables, TContext>,
      "mutationFn" | "onSettled"
    >
  ) =>
    useMutation({
      mutationFn: (data: CreateNetworkInfo) => create_network(data),
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: ["network"],
        }),

      ...options,
    });

  return {
    networkTreeData,
    useUpdateNetworkTree,
    useDeleteNetwork,
    useCreateNetowrk,
  };
};
