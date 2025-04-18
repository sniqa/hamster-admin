import { UpdateNetworkInfo } from "@/types/network";
import { fetchData, postData } from "./_fetch";

// find network select
export const find_network_select = async () => fetchData("/network/select");

// find network tree
export const find_network_tree = async () => fetchData("/network/tree");

// create
export const create_network = async <TData extends Record<string, unknown>>(
  req: TData
) => postData("/network/create", req);

// update
export const update_network = async (req: UpdateNetworkInfo) =>
  postData("/network/update", req);

// find ip
export const find_ip_address_by_network_id = async (req: { id: number }) => {
  if (!req.id) {
    return [];
  }

  return postData("/ip-address", req);
};

// delete
export const delete_network_by_id = async (req: { id: number }) => {
  if (!req.id) {
    return;
  }

  return postData("/network/delete", req);
};
