import { CreateDeviceInfo, UpdateDeviceInfo } from "@/types/device";
import { fetchData, postData } from "./_fetch";

export const find_device = async () => fetchData("/device");

// create
export const create_device = async (req: CreateDeviceInfo) =>
  postData("/device/create", req);

// delete
export const delete_device_by_id = async (req: { id: number }) => {
  if (!req.id) {
    return;
  }

  return postData("/device/delete", req);
};

// update
export const update_device = async (req: UpdateDeviceInfo) =>
  postData("/device/update", req);

export const find_device_history_by_id = async (req: { id: number }) => {
  if (!req.id) {
    return [];
  }

  return postData("/device-history", req);
};
